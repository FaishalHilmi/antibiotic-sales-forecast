import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peramalan Penjualan Antibiotik",
  description:
    "Sistem Peramalan Penjualan Obat Antibioitik Apotek Fajar Cempaka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <SessionWrapper>{children}</SessionWrapper>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
