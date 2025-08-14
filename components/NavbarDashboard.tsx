"use client";
import { useSidebar } from "@/hooks/useSidebar";
import { AlignLeft } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const session = useSession();

  const { toggleSidebar, toggleMobileSidebar } = useSidebar();

  const [isMobile, setIsMobile] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check pertama kali
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tutup dropdown saat klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

      <div ref={profileRef} className="flex items-center space-x-3">
        <span className="text-black font-medium hidden md:block capitalize">
          <span className="text-primary">Hello</span>,{" "}
          {session.data?.user?.name}
        </span>
        <img
          src="/profile-dummy.png"
          alt="Profile"
          className="w-8 h-8 rounded-full"
          onClick={() => setIsProfileMenuOpen((prev) => !prev)}
        />

        {/* Dropdown */}
        {isProfileMenuOpen && (
          <div className="absolute top-full right-2 mt-1 w-40 bg-white border shadow-md rounded-md z-50">
            <div className="flex flex-col p-2">
              <span className="block md:hidden w-full text-left py-2 text-sm hover:bg-gray-100 text-primary font-medium">
                Hello,{" "}
                <span className="text-black">{session.data?.user?.name}</span>
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left py-1 px-2 text-sm hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
