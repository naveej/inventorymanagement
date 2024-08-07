"use client";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen">
        <Sidebar />
      </div>
    </>
  );
}
