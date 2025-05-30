
```markdown
# LegalFlow – AI-Powered Legal Document Analyzer 🧠⚖️

LegalFlow is a Next.js 15-based web application that leverages artificial intelligence to analyze legal documents and provide actionable insights. It offers a seamless user experience for uploading, reviewing, and understanding complex legal content.



## 🚀 Features

- 🔐 User Authentication (Login & Signup)
- 📄 Upload legal documents for analysis
- 🤖 AI-powered legal clause and entity extraction
- 🗂️ History of previous analyses
- 🌐 Responsive design using Tailwind CSS
- ⚡ Fast, server-side rendered pages with Next.js 15
- 🧾 Type-safe backend using Prisma and TypeScript

---

## 🧱 Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: API Routes in App Directory (Next.js)
- **Database**: PostgreSQL (via Prisma ORM)
- **Language**: TypeScript
- **Deployment**: Vercel

---

## 📁 Project Structure

```

LegalFlow/
├── app/                 # App directory with pages and API routes
├── components/          # Reusable UI components
├── data/                # Static data / constants
├── lib/                 # Prisma client and utilities
├── prisma/              # Prisma schema and migrations
├── public/              # Static assets
├── utils/               # Helper functions
└── README.md            # Project overview

````

---

## 🛠️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/Shaswati2005/LegalFlow.git
cd LegalFlow
````

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up the Database**

Update your `.env` file with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Run the Prisma migration:

```bash
npx prisma migrate dev
npx prisma generate
```

4. **Run the Development Server**

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to explore the app.

---

## 🧪 Deployment on Vercel

If deploying to Vercel, add this to your `package.json`:

```json
"scripts": {
  "vercel-build": "prisma generate && next build"
}
```

This ensures the Prisma client is correctly generated during Vercel's build.

---

## 📄 Future Improvements

* 🧠 Better NLP analysis using transformer-based models
* 🗣️ Multilingual document support (e.g., Indian regional languages)
* 🧾 Generate legal letters or summaries from analyzed content
* 📊 Dashboard for visual clause analysis

---

## 🙏 Credits

Developed with ❤️ for a hackathon project by [Shaswati2005](https://github.com/Shaswati2005) [dasbidyendu](https://github.com/dasbidyendu)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

```

---

Let me know if you’d like me to include badges, a live link preview, or contribution guidelines.
```
