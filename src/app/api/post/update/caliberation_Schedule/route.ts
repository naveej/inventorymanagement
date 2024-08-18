import { connectDB } from "@/lib/database";
import CalibrationSchedule from "@/models/Caliberation_Schedule_Model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const body = await req.json();
  console.log("body", body);

  if (!body) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  try {
    await connectDB();

    if (body._id) {
      // Handle update logic here
      console.log("Updating caliberation schedule with ID:", body._id);
      const result = await CalibrationSchedule.findByIdAndUpdate(body._id, body, { new: true });

      if (!result) {
        return NextResponse.json({ message: "Caliberation Schedule not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Caliberation Schedule updated successfully", data: result });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}