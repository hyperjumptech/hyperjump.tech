import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, language } = body;

  // Basic validation server-side
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const apiKey = process.env.SUBSCRIBE_API_KEY;
  const apiUrl = process.env.FRONTIERNOTES_API_URL ?? "https://tech-monitor.fly.dev";

  if (!apiKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const res = await fetch(`${apiUrl}/api/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      language: language ?? "en",
    }),
  });

  let data: { status?: string } = {};
  try {
    data = await res.json();
  } catch {
    // FrontierNotes returned non-JSON (e.g. plain text error)
  }

  if (res.status === 201 || res.status === 200) {
    return NextResponse.json({ status: data.status ?? "subscribed" }, { status: 200 });
  }

  return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
}
