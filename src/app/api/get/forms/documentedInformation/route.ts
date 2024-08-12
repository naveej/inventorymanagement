import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import DocumentedInformation from "@/models/DocumentedInformationModel"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API route /api/get/forms/documentedInformation called");
  try {
    await connectDB();
    console.log("Database connected");

    const response = await DocumentedInformation.find();
    console.log("Documented Information fetched:", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching documented information:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
