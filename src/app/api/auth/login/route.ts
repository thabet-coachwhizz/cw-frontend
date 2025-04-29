// This hides the token from JavaScript and makes it accessible only by server-side middleware.
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const response = NextResponse.json({
    message: 'Login successful',
    user: data.user,
    access_token: data.access_token, // optional for client-side if needed
    refresh_token: data.refresh_token,
  });

  response.cookies.set('access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 30, // 30 min
    sameSite: 'lax',
  });

  return response;
}
