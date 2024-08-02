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
  skills: string[];
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
    skills,
  }: RequestBody = await request.json();

  try {
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
      skills,
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
