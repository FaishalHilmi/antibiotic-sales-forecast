import {
  ClipboardList,
  FileText,
  Home,
  LineChart,
  Pill,
  Users2,
} from "lucide-react";

export const navLinkData = [
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
