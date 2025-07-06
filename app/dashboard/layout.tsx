"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import NavbarDashboard from "@/components/NavbarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen text-black bg-base">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <NavbarDashboard />
          <main className="px-4 py-2 sm:px-6 sm:py-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
