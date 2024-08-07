import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

// const inter = Inter({ subsets: ["latin"] });

// -- Font Config --
const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Inventory Management Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
