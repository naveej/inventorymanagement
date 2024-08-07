import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import SkillMatrix from "@/models/SkillMatrixModel"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API route /api/get/forms/skillMatrix called");
  try {
    await connectDB();
    console.log("Database connected");

    const skillMatrices = await SkillMatrix.find();
    console.log("SkillMatrices fetched:", skillMatrices);

    return NextResponse.json(skillMatrices, { status: 200 });
  } catch (error) {
    console.error("Error fetching SkillMatrix:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
