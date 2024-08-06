import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import SkillMatrix from "@/models/SkillMatrix"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

type RequestBody = {
  metadata: {
    docNo: string;
    version: string;
    preparedBy: string;
    reviewedBy: string;
    approvedBy: string;
    departmentName: string;
  };
  name: string;
  skills: string[];
};

export async function POST(request: Request) {
  try {
    const { metadata, name, skills }: RequestBody = await request.json();

    await connectDB();

    const result = new SkillMatrix({
      metadata,
      name,
      skills,
    });

    await result.save();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error saving SkillMatrix:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
