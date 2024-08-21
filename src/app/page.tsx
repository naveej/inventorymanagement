"use client";
import NCOutputform from "./forms/NC-Outputform/page";
import TestForm from "./forms/TestForm/page";
import TestDashboard from "./dashboard/TestDashboard/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardCards from "@/components/DashBoardCards";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading")
    return <div>Loading...</div>; // Show a loading state while checking session
  else
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-3xl mx-auto p-10 text-center">
          {/* //hello user header heading */}
          <h1 className="text-3xl font-bold">
            Hello,{" "}
            <span className="font-bold italic">{session?.user?.firstName}</span>
          </h1>
          <DashboardCards />
        </div>
      </div>
    );
}
