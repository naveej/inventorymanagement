import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import CalibrationSchedule from "@/models/Caliberation_Schedule_Model"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API route /api/get/forms/calibrationSchedule called");
  try {
    await connectDB();
    console.log("Database connected");

    const schedules = await CalibrationSchedule.find();
    console.log("Calibration schedules fetched:", schedules);

    return NextResponse.json(schedules, { status: 200 });
  } catch (error) {
    console.error("Error fetching calibration schedules:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
