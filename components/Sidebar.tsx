"use client";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { Home, LineChart } from "lucide-react";

export default function Sidebar() {
  const { isExpanded, isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <>
      {/* Overlay untuk mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 bg-white border-r border-gray-200 transition-all duration-300 z-50 
          ${isExpanded ? "w-64" : "w-20"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static min-h-screen
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center p-4">
          <img src="/logo_apotek_fajar.png" alt="Logo" className="w-10 h-10" />
          {isExpanded && (
            <span className="font-bold text-lg ml-3 hidden md:inline leading-snug">
              Apotek Fajar Cempaka
            </span>
          )}
        </div>

        {/* Menu Section */}
        <nav
          className={`flex flex-col p-2 space-y-2 ${
            !isExpanded && "items-center"
          }`}
        >
          <Link
            href="/dashboard"
            className="flex items-center p-2 rounded hover:bg-gray-200"
            onClick={toggleMobileSidebar}
          >
            <Home className="w-5 h-5" />
            {isExpanded && <span className="ml-3">Home</span>}
          </Link>
          <Link
            href="/dashboard/forecast"
            className="flex items-center p-2 rounded hover:bg-gray-200"
            onClick={toggleMobileSidebar}
          >
            <LineChart className="w-5 h-5" />
            {isExpanded && <span className="ml-3">Peramalan</span>}
          </Link>
        </nav>
      </div>
    </>
  );
}
