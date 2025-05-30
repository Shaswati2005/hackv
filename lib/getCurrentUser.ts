// /lib/getCurrentUser.ts
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies(); // Await here
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const user = JSON.parse(token); // stored as JSON string in the cookie
    return user; // { email, username }
  } catch {
    return null;
  }
}
