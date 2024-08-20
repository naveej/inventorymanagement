import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import UserModel from "@/models/UserModel"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API route /api/get/authUser/users called");
  try {
    await connectDB();
    console.log("Database connected");

    const users = await UserModel.find();
    console.log("users fetched:", users);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
