import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", req.url));

  // Get the cookie store
  

  // Delete the access_token cookie by setting it to empty with maxAge 0
  response.cookies.set({
    name: "access_token",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
