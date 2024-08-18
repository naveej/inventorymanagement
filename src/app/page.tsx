"use client";
import NCOutputform from "./forms/NC-Outputform/page";
import TestForm from "./forms/TestForm/page";
import TestDashboard from "./dashboard/TestDashboard/page";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-10">
      {/* //hello user header heading */}
      <h1 className="text-3xl font-bold text-center">
        Hello , <span className="font-bold italic">User</span>
      </h1>
      <NCOutputform />
    </div>
  );
}
