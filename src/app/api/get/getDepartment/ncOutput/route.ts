import { connectDB } from "@/lib/database"; // Adjust the import path as necessary
import NCOutput from "@/models/NCOutputModel"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET(req: Request) { // Update the function signature
  try {
    await connectDB();
  console.log("Database connected");
  const url = new URL(req.url);
  const department = url.searchParams.get('departmentName');

  console.log(department)
  
    const count = await NCOutput.countDocuments({ "metadata.departmentName" :department });
    return NextResponse.json({ count },{status: 200});
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, {status: 500});
  }
}

