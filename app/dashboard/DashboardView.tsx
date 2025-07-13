import { Pill, Receipt, ShoppingCart } from "lucide-react";
import React from "react";
import SummaryCard from "./components/SummaryCard";
import WeeklySalesChart from "./components/WeeklySalesChart";
import RecentTransactions from "./components/RecentTransactions";

export default function DashboardView() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        <SummaryCard
          title="Total Penjualan"
          subtitle={formattedDate}
          value={"37"}
          icon={<ShoppingCart className="text-white w-6 h-6" />}
        />
        <SummaryCard
          title="Total Transaksi"
          subtitle={formattedDate}
          value="2.450.000"
          icon={<Receipt className="text-white w-6 h-6" />}
        />
        <SummaryCard
          title="Jumlah Obat"
          subtitle="Total Obat Tersedia"
          value="15"
          icon={<Pill className="text-white w-6 h-6" />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-2 md:mt-4">
        <WeeklySalesChart />
        <RecentTransactions />
      </div>
    </div>
  );
}
