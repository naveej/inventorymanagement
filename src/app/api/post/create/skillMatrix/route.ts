import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import SkillMatrix from "@/models/SkillMatrixModel"; // Adjust the import path as necessary
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

    // Validate the required fields
    if (!metadata || typeof metadata !== "object") {
      return NextResponse.json({ error: "Invalid metadata" }, { status: 400 });
    }

    const {
      docNo,
      version,
      preparedBy,
      reviewedBy,
      approvedBy,
      departmentName,
    } = metadata;

    if (!docNo || typeof docNo !== "string") {
      return NextResponse.json({ error: "Invalid docNo" }, { status: 400 });
    }
    if (!version || typeof version !== "string") {
      return NextResponse.json({ error: "Invalid version" }, { status: 400 });
    }
    if (!preparedBy || typeof preparedBy !== "string") {
      return NextResponse.json(
        { error: "Invalid preparedBy" },
        { status: 400 }
      );
    }
    if (!reviewedBy || typeof reviewedBy !== "string") {
      return NextResponse.json(
        { error: "Invalid reviewedBy" },
        { status: 400 }
      );
    }
    if (!approvedBy || typeof approvedBy !== "string") {
      return NextResponse.json(
        { error: "Invalid approvedBy" },
        { status: 400 }
      );
    }
    if (!departmentName || typeof departmentName !== "string") {
      return NextResponse.json(
        { error: "Invalid departmentName" },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (
      !Array.isArray(skills) ||
      skills.some((skill) => typeof skill !== "string")
    ) {
      return NextResponse.json({ error: "Invalid skills" }, { status: 400 });
    }

    await connectDB();

    const result = new SkillMatrix({
      metadata,
      name,
      skills,
      lastUpdated: new Date(), // Ensure lastUpdated is set
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
