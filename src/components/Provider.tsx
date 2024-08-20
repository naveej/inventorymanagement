"use client";
import React from "react";
import { ThemeProvider } from "./ThemeProvider"; // Adjust the import path as necessary
import SideNavbar from "./SideNavBar";
import { SessionProvider } from "next-auth/react";

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
      <SessionProvider refetchOnWindowFocus={true}>
      <main className="flex flex-col min-h-screen bg-background">
        <div className="flex flex-1">
          {/* -- Sidebar -- */}
          <SideNavbar />

          {/* Main content */}
          <div className="flex-1">{children}</div>
        </div>
      </main>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;
