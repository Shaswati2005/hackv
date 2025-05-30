import { NextRequest, NextResponse } from 'next/server';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Schema, // Import Schema
  SchemaType
} from '@google/generative-ai';
import { prisma } from '@/lib/prisma'; // Adjust path as needed



// Define the expected output structure (useful for type checking and prompting)
interface LegalAnalysisOutput {
  id: string;
  Text: string; // shortened text of the input text
  Total_Clauses: number;
  Dangerous_Clause: number;
  Generated_Suggestions_Number: number;
  ProofReading_Score: number; // e.g., out of 100
  Risk_Summary: string;
  Document_Summary: string[];
  Dangerous_Clauses: string[];
  Suggestions: string[];
  Proofreading_Fixes: string[];
}

const legalAnalysisResponseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    id: { type: SchemaType.STRING },
    Text: { type: SchemaType.STRING },
    Total_Clauses: { type: SchemaType.INTEGER },
    Dangerous_Clause: { type: SchemaType.INTEGER },
    Generated_Suggestions_Number: { type: SchemaType.INTEGER },
    ProofReading_Score: { type: SchemaType.INTEGER },
    Risk_Summary: { type: SchemaType.STRING },
    Document_Summary: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    Dangerous_Clauses: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    Suggestions: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    Proofreading_Fixes: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
  },
  required: [
    "id",
    "Text",
    "Total_Clauses",
    "Dangerous_Clause",
    "Generated_Suggestions_Number",
    "ProofReading_Score",
    "Risk_Summary",
    "Document_Summary",
    "Dangerous_Clauses",
    "Suggestions",
    "Proofreading_Fixes",
  ],
};

const MODEL_NAME = "gemini-1.5-flash-latest"; // Using a generally available Flash model
const API_KEY = process.env.GOOGLE_API_KEY || "";

// Ensure the API key is available
if (!API_KEY) {
  console.error("GOOGLE_API_KEY is not set. Please set it in your environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Safety settings to minimize blocking of legitimate legal content (adjust as needed)
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function POST(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "API key not configured. Please contact the administrator." },
      { status: 500 }
    );
  }

  try {
    const { textInput , userId } = await request.json();

    if (!textInput || typeof textInput !== 'string' || textInput.trim() === '') {
      return NextResponse.json({ error: 'Invalid input: textInput is required and must be a non-empty string.' }, { status: 400 });
    }
    
    const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        safetySettings,
        generationConfig: {
            responseMimeType: "application/json", // Request JSON output
            responseSchema: legalAnalysisResponseSchema
        }
    });

    const prompt = `
      You are an expert legal advisor and meticulous proofreader.
      Analyze the following text and provide a structured JSON output.

      Input Text:
      """
      ${textInput}
      """

      Output strictly in the following JSON format, ensuring all fields are populated accurately based on your analysis:
      {
        "id": "generate a unique UUID for this analysis",
        "Text": "Provide a concise summary or shortened version of the input text (max 50 words).",
        "Total_Clauses": "Identify and count the total number of distinct clauses or contractual points in the text.",
        "Dangerous_Clause": "Count how many of these clauses you identify as potentially dangerous, ambiguous, or unfair.",
        "Generated_Suggestions_Number": "Count the total number of actionable suggestions you are providing (sum of 'Suggestions' and 'Proofreading_Fixes' array lengths).",
        "ProofReading_Score": "Rate the proofreading quality of the text on a scale of 0 to 100 (100 being perfect).",
        "Risk_Summary": "Provide a brief summary of the overall legal risks identified in the text.",
        "Document_Summary": ["Provide a bullet-point summary of the key aspects or sections of the document."],
        "Dangerous_Clauses": ["List the exact text of clauses you identified as dangerous, ambiguous, or unfair. If none, provide an empty array."],
        "Suggestions": ["Provide actionable suggestions to improve the legal standing or clarity of the document (e.g., 'Consider adding a clause for X', 'Rephrase Y for clarity'). If none, provide an empty array."],
        "Proofreading_Fixes": ["Identify and list specific proofreading errors and suggest corrections (e.g., 'Change 'teh' to 'the' in sentence Z', 'Sentence A is a run-on sentence, suggest splitting it.'). If none, provide an empty array."]
      }

      Ensure numbers are actual numbers (integer) and not strings.
      Ensure all string arrays actually contain strings.
      If no items are found for an array (e.g., no dangerous clauses), return an empty array [].
      Do not include any explanatory text outside of the JSON structure itself.
      The 'Text' field should be a shortened version of the input, not the full input.
    `;

    console.log("Sending prompt to Gemini:", prompt.substring(0, 500) + "..."); // Log a snippet of the prompt

    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();

    console.log("Raw response from Gemini:", responseText); // Log the raw response

    if (!responseText) {
        // Check for safety ratings or other reasons for no content
        if (response.promptFeedback?.blockReason) {
            console.error("Prompt was blocked:", response.promptFeedback.blockReason);
            console.error("Safety Ratings:", response.promptFeedback.safetyRatings);
            return NextResponse.json(
                { error: `Request blocked due to: ${response.promptFeedback.blockReason}. Please revise your input.` },
                { status: 400 }
            );
        }
        return NextResponse.json({ error: "Failed to get a valid response from the AI model. The response was empty." }, { status: 500 });
    }

    let parsedOutput: LegalAnalysisOutput;
    try {
        // Sometimes the model might wrap the JSON in backticks and 'json'
        const cleanedResponseText = responseText.replace(/^```json\s*|```$/g, '').trim();
        parsedOutput = JSON.parse(cleanedResponseText);


    } catch (e) {
        console.error('Failed to parse JSON response from AI:', e);
        console.error('Raw AI Response that failed parsing:', responseText); // Log the problematic response
        return NextResponse.json(
            {
                error: 'Failed to parse the structured output from the AI. The AI response was not valid JSON.',
                rawResponse: responseText // Optionally send raw response for debugging (consider security implications)
            },
            { status: 500 }
        );
    }

    // Basic validation of the parsed output (can be made more robust)
    if (typeof parsedOutput.id !== 'string' ||
        typeof parsedOutput.Text !== 'string' ||
        typeof parsedOutput.Total_Clauses !== 'number' ||
        typeof parsedOutput.Dangerous_Clause !== 'number' ||
        typeof parsedOutput.Generated_Suggestions_Number !== 'number' ||
        typeof parsedOutput.ProofReading_Score !== 'number' ||
        typeof parsedOutput.Risk_Summary !== 'string' ||
        !Array.isArray(parsedOutput.Document_Summary) ||
        !Array.isArray(parsedOutput.Dangerous_Clauses) ||
        !Array.isArray(parsedOutput.Suggestions) ||
        !Array.isArray(parsedOutput.Proofreading_Fixes)
    ) {
        console.warn("Parsed output from AI does not fully match the expected structure.", parsedOutput);
        // You might still want to return the data if partially correct, or return an error
        // For this example, we'll flag it but still return. For stricter applications, return an error.
    }

      // Save parsedOutput to your DB
await prisma.legalAnalysis.create({
  data: {
    id: parsedOutput.id,
    userId: userId, 
    text: parsedOutput.Text,
    totalClauses: parsedOutput.Total_Clauses,
    dangerousClause: parsedOutput.Dangerous_Clause,
    generatedSuggestionsNumber: parsedOutput.Generated_Suggestions_Number,
    proofreadingScore: parsedOutput.ProofReading_Score,
    riskSummary: parsedOutput.Risk_Summary,
    documentSummary: parsedOutput.Document_Summary,
    dangerousClauses: parsedOutput.Dangerous_Clauses,
    suggestions: parsedOutput.Suggestions,
    proofreadingFixes: parsedOutput.Proofreading_Fixes
  }
});

return NextResponse.json(parsedOutput, { status: 200 });


    

  } catch (error: any) {
    console.error('Error in API route:', error);
    // Check if the error is from the Gemini API
    if (error.message && error.message.includes("API key not valid")) {
        return NextResponse.json({ error: "Invalid API key. Please check your GOOGLE_API_KEY." }, { status: 500 });
    }
    if (error.message && error.message.includes("FETCH_ERROR")) {
        return NextResponse.json({ error: "Network error: Could not connect to the AI service." }, { status: 503 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
}