import { Pill, Receipt, ShoppingCart } from "lucide-react";
import React from "react";
import SummaryCard from "./components/SummaryCard";
import WeeklySalesChart from "./components/WeeklySalesChart";
import RecentTransactions from "./components/RecentTransactions";
import { LastSevenDaysProps, summaryProps } from "@/types/summary";
import { format } from "date-fns";
import { formatRupiah } from "@/utils/formatCurrency";
import { LatestTransaction } from "@/types/transaction";

export default function DashboardView({ summary }: summaryProps) {
  const today = new Date();
  const formattedDate = format(today, "dd/MM/yyyy");

  const totalItems = summary.total_item != null ? summary.total_item : 0;
  const totalReveneu =
    summary.total_revenue != null ? formatRupiah(summary.total_revenue) : 0;
  const totalMedicines =
    summary.total_medicines != null ? summary.total_medicines : 0;
  const weeklySales = summary.seven_days_sales;
  const latestTransactions = summary.latest_transactions;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        <SummaryCard
          title="Total Penjualan"
          subtitle={formattedDate}
          value={`${totalItems} Produk`}
          icon={<ShoppingCart className="text-white w-6 h-6" />}
        />
        <SummaryCard
          title="Total Transaksi"
          subtitle={formattedDate}
          value={totalReveneu === 0 ? "Rp 0" : `${totalReveneu}`}
          icon={<Receipt className="text-white w-6 h-6" />}
        />
        <SummaryCard
          title="Jumlah Obat"
          subtitle="Total Obat Tersedia"
          value={`${totalMedicines} Item`}
          icon={<Pill className="text-white w-6 h-6" />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-2 md:mt-4">
        <WeeklySalesChart weeklySales={weeklySales} />
        <RecentTransactions latestTransaction={latestTransactions} />
      </div>
    </div>
  );
}
