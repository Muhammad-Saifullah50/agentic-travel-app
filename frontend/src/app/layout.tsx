import type { Metadata } from "next";
import "../index.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Agentic Travel Planner",
  description: "AI-powered travel planning app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-blue-50 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
