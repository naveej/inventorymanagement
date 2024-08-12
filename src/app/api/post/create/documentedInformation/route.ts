import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import DocumentedInformation from "@/models/DocumentedInformationModel"; // Adjust the import path as necessary
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
  documentTitle: string;
  refNo: string;
  versionNo: string;
  area: string;
  typeOfDocument: string;
  effectiveDate: Date;
  responsibility: string;
  mediumOfStorage: string;
  placeOfStorage: string;
  retentionPeriod: string;
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
    documentTitle,
    refNo,
    versionNo,
    area,
    typeOfDocument,
    effectiveDate,
    responsibility,
    mediumOfStorage,
    placeOfStorage,
    retentionPeriod,
  } = body;

  // Validate required fields
  if (
    !metadata ||
    !documentTitle ||
    !refNo ||
    !versionNo ||
    !area ||
    !typeOfDocument ||
    !effectiveDate ||
    !responsibility ||
    !mediumOfStorage ||
    !placeOfStorage ||
    !retentionPeriod
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const result = new DocumentedInformation({
      metadata,
      documentTitle,
      refNo,
      versionNo,
      area,
      typeOfDocument,
      effectiveDate,
      responsibility,
      mediumOfStorage,
      placeOfStorage,
      retentionPeriod,
      lastUpdated: new Date(),
    });

    await result.save();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error saving DocumentedInformation:", {
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
