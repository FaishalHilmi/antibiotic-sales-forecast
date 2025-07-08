"use client";
import { useSidebar } from "@/context/SidebarContext";
import { AlignLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check pertama kali
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center relative z-50">
      <button
        onClick={() => (isMobile ? toggleMobileSidebar() : toggleSidebar())}
        className="text-gray-700 rounded-lg"
      >
        <AlignLeft className="w-5" />
      </button>

      <div className="logo sm:hidden flex gap-2">
        <img src="/logo_apotek_fajar.png" alt="Logo" className="w-8 h-8" />
        <h1 className="text-xs font-semibold flex flex-col">
          <span>Dashboard Apotek</span>
          <span>Fajar Cempaka</span>
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-black font-medium hidden md:block">
          <span className="text-primary">Hello</span>, Admin
        </span>
        <img
          src="/profile-dummy.png"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
}
