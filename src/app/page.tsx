"use client";
import NCOutputform from "./forms/NC-Outputform/page";
import TestForm from "./forms/TestForm/page";
import TestDashboard from "./dashboard/TestDashboard/page";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-10">
      <NCOutputform />
    </div>
  );
}
