"use client";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  FileText,
  Home,
  LineChart,
  Pill,
  Users2,
} from "lucide-react";

export default function Sidebar() {
  const { isExpanded, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const pathname = usePathname();

  const navLinkData = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Kelola Obat",
      route: "/kelola-obat",
      icon: <Pill className="w-5 h-5" />, 
    },
    {
      name: "Riwayat Penjualan",
      route: "/kelola-penjualan",
      icon: <FileText className="w-5 h-5" />, 
    },
    {
      name: "Peramalan",
      route: "/peramalan",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      name: "Rekap Penjualan",
      route: "/rekap-penjualan",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      name: "Kelola Akun Kasir",
      route: "/kelola-akun-kasir",
      icon: <Users2 className="w-5 h-5" />,
    },
  ];

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
          {navLinkData.map((navLink, i) => (
            <Link
              key={i}
              href={navLink.route}
              className={`flex items-center p-2 rounded-md transition-colors duration-200
              ${
                pathname === navLink.route
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }
              ${!isExpanded && "justify-center"}
            `}
              onClick={toggleMobileSidebar}
            >
              {navLink.icon}
              {isExpanded && <span className="ml-3">{navLink.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
