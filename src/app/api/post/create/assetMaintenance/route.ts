import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import AssetMaintenance from "@/models/AssetMaintenanceModel"; // Adjust the import path as necessary
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
  assetName: string;
  assetNo: string;
  frequencyOfMaintenance: string;
  typeOfAsset: string;
  lastDoneAt: Date;
  refNo: string;
  nextDueOn: Date;
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
    assetName,
    assetNo,
    frequencyOfMaintenance,
    typeOfAsset,
    lastDoneAt,
    refNo,
    nextDueOn,
    comments,
  } = body;

  // Validate required fields
  if (
    !metadata ||
    !assetName ||
    !assetNo ||
    !frequencyOfMaintenance ||
    !typeOfAsset ||
    !lastDoneAt ||
    !refNo ||
    !nextDueOn ||
    !comments
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const result = new AssetMaintenance({
      metadata,
      assetName,
      assetNo,
      frequencyOfMaintenance,
      typeOfAsset,
      lastDoneAt,
      refNo,
      nextDueOn,
      comments,
      lastUpdated: new Date(),
    });

    await result.save();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error saving AssetMaintenance:", {
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
