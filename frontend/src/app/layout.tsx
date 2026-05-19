import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SYNCUP | Realtime Coaching Platform",
  description: "A production-grade realtime coaching feed application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col text-gray-900 antialiased`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 relative z-10">
          {children}
        </main>
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
          }
        }} />
      </body>
    </html>
  );
}
