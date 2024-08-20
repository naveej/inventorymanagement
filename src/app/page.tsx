"use client";
import NCOutputform from "./forms/NC-Outputform/page";
import TestForm from "./forms/TestForm/page";
import TestDashboard from "./dashboard/TestDashboard/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading')
    return <div>Loading...</div>; // Show a loading state while checking session
  else
    return (
      <div className="max-w-3xl mx-auto p-10">
        {/* //hello user header heading */}
        <h1 className="text-3xl font-bold text-center">
          Hello , <span className="font-bold italic">{session?.user?.firstName}</span>
        </h1>
        <NCOutputform />
      </div>
    );
}
