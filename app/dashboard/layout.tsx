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
      <div className="md:flex min-h-screen text-black bg-base">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <NavbarDashboard />
          <main className="px-4 py-4 sm:px-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
