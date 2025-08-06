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
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border shadow-md rounded-md z-50">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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
            href="/pos/products"
            className="p-2 w-full text-center hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Daftar Obat
          </Link>
          <Link
            href="/pos/history"
            className="p-2 w-full text-center hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Riwayat Transaksi
          </Link>

          {/* User Info + Logout */}
          <div className="p-4 w-full border-t bg-gray-50 flex flex-col items-center">
            <img
              src="/profile-dummy.png"
              alt="Profile"
              className="w-10 h-10 rounded-full mb-1"
            />
            <span className="text-sm font-medium text-gray-800 mb-2">
              {session.data?.user?.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
