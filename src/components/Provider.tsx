"use client";
import React from "react";
import Sidebar from "./ui/Sidebar";
import { ThemeProvider } from "./ThemeProvider"; // Adjust the import path as necessary
import SideNavbar from "./SideNavBar";
import { Nav } from "./ui/nav";

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex flex-col min-h-screen bg-background">
        <div className="flex flex-1">
          {/* -- Sidebar -- */}
          <SideNavbar />

          {/* Main content */}
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default Provider;
