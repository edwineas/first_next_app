import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.log('Login request received');
  const { username, password } = await req.json();
  console.log('Username:', username);
  console.log('Password:', password)
  if (username === 'user' && password === 'pass') {
    console.log('Login successful');
    return NextResponse.json({ success: true, message: "Login successful" });
  } else {
    console.log('Invalid username or password');
    return NextResponse.json({ success: false, message: 'Invalid username or password' });
  }
}