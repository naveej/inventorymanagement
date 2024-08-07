"use client";
import React from "react";
import Navbar from "./ui/navbar";
import Sidebar from "./ui/Sidebar";

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <main>
      {/* Header */}
      <Navbar />

      {children}

      {/* Footer */}
    </main>
  );
};

export default Provider;
