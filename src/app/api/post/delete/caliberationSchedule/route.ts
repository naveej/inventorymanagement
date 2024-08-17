import { connectDB } from "@/lib/database";
import CalibrationSchedule from "@/models/Caliberation_Schedule_Model";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (req.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    await connectDB();
    const result = await CalibrationSchedule.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { message: "CalibrationSchedule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Row deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting CalibrationSchedule:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 200 }
    );
  }
}
