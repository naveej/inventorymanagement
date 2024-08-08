"use client";
import React from "react";
import Sidebar from "./ui/Sidebar";
import Navbar from "./ui/navbar";

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <main className="flex flex-col h-screen">
      {/* Nav */}
      <Navbar />

      <div className="flex flex-1">
        {/* -- Sidebar -- */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
};

export default Provider;
