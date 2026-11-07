import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LimePhoenix | Closest Autonomous Courier Wins",
  description: "Documents & small parcels ≤10 lb via Cybercab Austin & Waymo LA. Plus your Phoenix Desktop Companion. By Matryxx LLC, Sheridan, Wyoming.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {children}
      </body>
    </html>
  );
}