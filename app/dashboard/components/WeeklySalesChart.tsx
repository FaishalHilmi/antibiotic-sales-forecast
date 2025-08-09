import BarChart from "@/components/BarChart";
import { weeklySalesProps } from "@/types/sales";

export default function WeeklySalesChart({ weeklySales }: weeklySalesProps) {
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="cart-wrapper bg-white border border-gray-200 p-3 md:p-4 rounded-2xl">
        <h1 className="font-semibold text-lg md:text-xl -mb-4">
          Penjualan Mingguan
        </h1>
        <BarChart weeklySales={weeklySales} />
      </div>
    </div>
  );
}
