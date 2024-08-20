import AuthUser from '@/models/AuthModel';
import jwt, { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import dotenv from "dotenv";
import { connectDB } from '@/lib/database';
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
    await connectDB();
    // Find user by email
    const user = await AuthUser.findOne({ email });
    console.log(user)
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    // Generate tokens
    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });

    // Save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    const response = NextResponse.json({ accessToken }, { status: 200 });
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}