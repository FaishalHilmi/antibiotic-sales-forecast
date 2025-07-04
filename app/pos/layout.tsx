"use client";
import NavbarPos from "@/components/NavbarPos";

export default function POSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-black">
      <NavbarPos />
      <main className="flex-1 py-4 px-4 sm:px-20">{children}</main>
    </div>
  );
}
