"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavbarPOS() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b py-4 px-4 sm:px-20 flex justify-between items-center relative z-50">
      {/* Kiri - Logo */}
      <div className="flex items-center justify-center">
        <img src="/logo_apotek_fajar.png" alt="Logo" className="w-8 h-8" />
        <div className="logo-text font-semibold text-sm sm:text-lg ml-2 sm:ml-3 leading-snug flex flex-col">
          <span>Apotek Fajar</span>
          <span className="-mt-1 sm:-mt-1">Cempaka</span>
        </div>
      </div>

      {/* Tengah - Nav Links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/pos" className="text-black hover:text-primary">
          Beranda
        </Link>
        <Link href="/pos/products" className="text-black hover:text-primary">
          Daftar Obat
        </Link>
        <Link href="/pos/history" className="text-black hover:text-primary">
          Riwayat Transaksi
        </Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-2xl text-gray-700"
      >
        ☰
      </button>

      {/* Kanan - Profile */}
      <div className="hidden md:flex items-center space-x-3">
        <span className="text-black font-semibold">
          <span className="text-primary">Hello</span>, Admin
        </span>
        <img
          src="/logo_apotek-fajar.png"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t flex flex-col items-center md:hidden shadow-custom">
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
          <div className="p-2 w-full text-center border-t">
            <span>Admin</span>
          </div>
        </div>
      )}
    </header>
  );
}
