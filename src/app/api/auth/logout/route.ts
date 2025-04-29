//This clears the access_token cookie server-side.

import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  response.cookies.set('access_token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
  });

  return response;
}
