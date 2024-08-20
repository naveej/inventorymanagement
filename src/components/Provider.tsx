"use client";
import React, { useEffect } from "react";
import { ThemeProvider } from "./ThemeProvider"; // Adjust the import path as necessary
import SideNavbar from "./SideNavBar";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
