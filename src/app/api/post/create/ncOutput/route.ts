import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import NCOutput from "@/models/NCOutputModel"; // Adjust the import path as necessary
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
  date: Date
  ncDetails: string;
  reason: string;
  actionTaken: string;
  responsibility: string;
  approvedBy: string;
  targetDate: Date;
  status: string;
  comments: string;
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const {
        metadata,
        date,
        ncDetails,
        reason,
        actionTaken,
        responsibility,
        approvedBy,
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
      !approvedBy ||
      !targetDate ||
      !status||
      !comments
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const result = new NCOutput({
      metadata,
      date: new Date(),
      ncDetails,
      reason,
      actionTaken,
      responsibility,
      approvedBy,
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
      requestBody: await request.json(),
    });
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
