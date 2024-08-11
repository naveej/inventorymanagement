import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import NCOutput from "@/models/NCOutputModel"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API route /api/get/form/getncoutputform called");
  try {
    await connectDB();
    console.log("Database connected");

    const response = await NCOutput.find();
    console.log("NC Output fetched:", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
