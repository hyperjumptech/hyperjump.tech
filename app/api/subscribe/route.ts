import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, language, turnstileToken } = body;

  // Basic validation server-side
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  if (!turnstileToken) {
    return NextResponse.json(
      { error: "Missing CAPTCHA verification" },
      { status: 422 }
    );
  }

  const turnstileVerifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: req.headers.get("x-forwarded-for") ?? undefined
      })
    }
  );

  let turnstileData: { success?: boolean } = {};
  try {
    turnstileData = await turnstileVerifyRes.json();
  } catch {
    // Cloudflare returned non-JSON, treat as verification failure below
  }

  if (turnstileData.success !== true) {
    return NextResponse.json(
      { error: "CAPTCHA verification failed" },
      { status: 403 }
    );
  }

  const apiKey = process.env.SUBSCRIBE_API_KEY;
  const apiUrl =
    process.env.FRONTIERNOTES_API_URL ?? "https://tech-monitor.fly.dev";

  if (!apiKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const res = await fetch(`${apiUrl}/api/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      language: language ?? "en"
    })
  });

  let data: { status?: string } = {};
  try {
    data = await res.json();
  } catch {
    // FrontierNotes returned non-JSON (e.g. plain text error)
  }

  if (res.status === 201 || res.status === 200) {
    return NextResponse.json(
      { status: data.status ?? "subscribed" },
      { status: 200 }
    );
  }

  return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
}
