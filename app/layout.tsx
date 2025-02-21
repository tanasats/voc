import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Sarabun } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "@/app/context/SessionContext";
//import { Toaster } from "react-hot-toast";
import { Toaster } from "@/components/ui/toaster";

const sarabun = Sarabun({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin", "thai"],
  variable: '--font-sarabun',
})

export const metadata: Metadata = {
  title: "VoC @msu",
  description: "ระบบรับฟังเสียจากผู้มีส่วนได้เสีย มหาวิทยาลัยมหาสารคาม",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" className="text-[16px] sm:text-[16px]">
        <body className={`${sarabun.className} antialiased`}>
          <Navbar />
          {children}
          {/* <Toaster
            position="bottom-right"
            reverseOrder={false}
          /> */}
          <Toaster/>
        </body>
      </html>

    </SessionProvider>
  );
}
