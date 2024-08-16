import AuthUser from '@/models/AuthModel';
import jwt, { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import dotenv from "dotenv";

dotenv.config();

type RequestBody = {
  email: string;
  password: string;
};


export async function POST(request: Request) {
  try {
    const { email, password }: RequestBody = await request.json();

    // Validate the required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Find user by email
    const user = await AuthUser.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const accessKey = process.env.ACCESS_TOKEN_SECRET
    // Generate tokens
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });

    // Save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    const response = NextResponse.json({ accessToken }, { status: 200 });
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}