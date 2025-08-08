"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function NavbarPOS() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const session = useSession();

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
    <header className="bg-white border-b py-4 px-4 sm:px-20 flex justify-between items-center relative z-50">
      {/* Kiri - Logo */}
      <div className="flex items-center">
        <img src="/logo_apotek_fajar.png" alt="Logo" className="w-8 h-8" />
        <div className="ml-2 sm:ml-3 font-semibold text-sm sm:text-lg leading-tight">
          <span>Apotek Fajar</span>
          <span className="block -mt-1">Cempaka</span>
        </div>
      </div>

      {/* Tengah - Menu Desktop */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/pos" className="text-black hover:text-primary">
          Beranda
        </Link>
        <Link href="/pos/history" className="text-black hover:text-primary">
          Riwayat Transaksi
        </Link>
      </nav>

      {/* Kanan - Profile + Dropdown */}
      <div
        className="hidden md:flex items-center space-x-3 relative"
        ref={profileRef}
      >
        <span className="text-black font-semibold">
          <span className="text-primary">Hello</span>,{" "}
          {session.data?.user?.name}
        </span>
        <img
          src="/profile-dummy.png"
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => setIsProfileMenuOpen((prev) => !prev)}
        />

        {/* Dropdown */}
        {isProfileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border shadow-md rounded-md z-50 p-2">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full text-left py-1 px-2 text-sm hover:bg-gray-100 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-2xl text-gray-700"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t flex flex-col items-center md:hidden shadow-custom z-50">
          <Link
            href="/pos"
            className="p-2 w-full text-center hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Beranda
          </Link>
          <Link
            href="/pos/history"
            className="p-2 w-full text-center hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Riwayat Transaksi
          </Link>

          {/* User Info + Logout */}
          <div className="py-2 px-4 w-full border-t flex justify-between items-center">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-primary text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">
                Hello, <span className="text-primary">Ginsu</span>
              </span>
              <img
                src="/profile-dummy.png"
                alt="Profile"
                className="w-8 h-8 rounded-full mb-1"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
