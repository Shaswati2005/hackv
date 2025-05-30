
import {supabase } from "@/lib/supabaseClient";


export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 401,
    });
  }

  

  return Response.json({ user: data.user,id:data.user.id });
}
