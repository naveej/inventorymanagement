import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import Asset from "@/models/AssetMaintenanceModel"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API route /api/get/form/getassetmanagementform called");
  try {
    await connectDB();
    console.log("Database connected");

    const assets = await Asset.find();
    console.log("Assets fetched:", assets);

    return NextResponse.json(assets, { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
