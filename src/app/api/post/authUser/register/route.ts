import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { UserRole } from "../../../../_types/userRole";
import { hashPassword } from "@/lib/authUtils";

type RequestBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  departmentName?: string;
};

async function validateRequestBody(body: RequestBody) {
  const { firstName, lastName, email, password, role, departmentName } = body;

  if (!firstName || !lastName || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  if (role === UserRole.Department && !departmentName) {
    throw new Error("Department name is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
}

async function checkIfEmailExists(email: string) {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    await validateRequestBody(body);
    await connectDB();
    await checkIfEmailExists(body.email);

    const hashedPwd = await hashPassword(body.password);

    const newUser = new UserModel({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPwd,
      role: body.role,
      departmentName:
        body.role === UserRole.Department ? body.departmentName : undefined,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving userDetails:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
