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

      <h1 className="logo sm:hidden">
        <img src="/logo_apotek_fajar.png" alt="Logo" className="w-8 h-8" />
      </h1>
      <div className="profile flex gap-3 items-center">
        <span className="text-sm hidden sm:inline">John Thor</span>
        <div className="px-2 py-1.5 sm:px-3 sm:py-2 text-sm bg-gray-200 rounded-full">
          JT
        </div>
      </div>
    </div>
  );
}
