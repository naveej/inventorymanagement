import { connectDB } from "@/lib/database";
import AssetMaintenance from "@/models/AssetMaintenanceModel";
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
    const result = await AssetMaintenance.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { message: "AssetMaintenance not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Row deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting AssetMaintenance:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 200 }
    );
  }
}
