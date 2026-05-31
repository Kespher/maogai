export async function onRequestGet() {
  return Response.json({
    ok: true,
    message: "AI API is running. Use POST /api/ai."
  });
}

export async function onRequestPost({ request, env }) {
  return Response.json({
    ok: true,
    method: "POST",
    hasGeminiKey: Boolean(env.GEMINI_API_KEY),
    message: "POST route is working."
  });
}