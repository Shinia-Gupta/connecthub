import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { auth } from "@/src/auth";
import Image from "next/image";
import SignoutBtn from "./components/UI/sign-out-button";
import Navbar from "@/src/app/components/Navbar";
import Footer from "@/src/app/components/Footer";
import ThemeInitializer from "./components/ThemeInitializer";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect Hub 2",
  description: "Connect Hub",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  const user = session?.user;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeInitializer/>
        <Navbar />
        <ReactQueryProvider>
        {children}
        </ReactQueryProvider>
        <Footer />
        
        <ToastContainer />
      </body>
    </html>
  );
}
