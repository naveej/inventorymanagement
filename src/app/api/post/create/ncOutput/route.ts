import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import NCOutput from "@/models/NCOutputModel"; // Adjust the import path as necessary
import { NextResponse } from "next/server"; // Ensure Request is imported

type RequestBody = {
  metadata: {
    docNo: string;
    version: string;
    preparedBy: string;
    reviewedBy: string;
    approvedBy: string;
    departmentName: string;
  };
  ncDetails: string;
  reason: string;
  actionTaken: string;
  responsibility: string;
  ncApprovedBy: string;
  targetDate: Date;
  status: string;
  comments: string;
};

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    metadata,
    ncDetails,
    reason,
    actionTaken,
    responsibility,
    ncApprovedBy,
    targetDate,
    status,
    comments,
  } = body;

  // Validate required fields
  if (
    !metadata ||
    !ncDetails ||
    !reason ||
    !actionTaken ||
    !responsibility ||
    !ncApprovedBy ||
    !targetDate ||
    !status ||
    !comments
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const result = new NCOutput({
      metadata,
      date: new Date(),
      ncDetails,
      reason,
      actionTaken,
      responsibility,
      ncApprovedBy,
      targetDate,
      status,
      comments,
      lastUpdated: new Date(),
    });

    await result.save();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error saving NCOutput:", {
      message: (error as Error).message,
      stack: (error as Error).stack,
      requestBody: body,
    });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
