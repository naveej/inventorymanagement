import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";
import SkillMatrix from "@/models/SkillMatrix";

type RequestBody = {
  docNo: string;
  version: string;
  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
  departmentName: string;
  name: string;
  skills: string[]; // Update skills type to an array of strings
};

export async function POST(request: Request) {
  const {
    docNo,
    version,
    preparedBy,
    reviewedBy,
    approvedBy,
    departmentName,
    name,
    skills, // Update skills variable name
  }: RequestBody = await request.json();

  try {
    if (!docNo)
      throw new NextResponse(JSON.stringify("Invalid Form Fields"), {
        status: 402,
      });

    await connectDB();

    const result = new SkillMatrix({
      metadata: {
        docNo,
        version,
        preparedBy,
        reviewedBy,
        approvedBy,
        departmentName,
      },
      name,
      skills, // Pass the skills array directly
    });
    console.log("SkillMatrix document:", result);
    await result.save();

    return new NextResponse(JSON.stringify("Submitted Form Successfully!"), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
