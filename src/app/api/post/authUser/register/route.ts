import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/lib/database';
import AuthUser from '@/models/AuthModel';
import { UserRole } from '../../../../_types/userRole';

type RequestBody = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    departmentName?: string;
  };

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, role,departmentName }: RequestBody = await request.json();

    // Validate the required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if(role === UserRole.Department && !departmentName){
        return NextResponse.json({ error: "Department name is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    await connectDB();

    // Check if email already exists
    const existingUser = await AuthUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Store the user data in the database
    const result = new AuthUser({
      firstName,
      lastName,
      email,
      password: hashedPwd,
      role,
      departmentName: role === UserRole.Department ? departmentName : undefined,
      refreshToken: null
    });

    await result.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving userDetails:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}