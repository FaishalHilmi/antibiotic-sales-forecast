"use client";

import BarChart from "@/components/BarChart";
import { Pill, Receipt, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { transactions } from "@/data/transaction";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Halo, Admin 👋</h2>
      <p className="text-gray-500 mb-4 md:mb-6">
        Ini ringkasan penjualan dan aktivitas hari ini.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        <div className="cols-span-1 border p-3 md:p-4 rounded-xl bg-white flex justify-between items-center">
          <div className="text">
            <h1 className="font-medium text-md md:text-lg text-gray-500">
              Total Penjualan
            </h1>
            <span className="text-sm -mt-1 text-gray-400 block mb-3">
              12/10/2025
            </span>
            <span className="font-bold text-xl">37 Produk</span>
          </div>
          <div className="icon p-3.5 bg-primary rounded-lg flex items-center h-fit shadow-lg">
            <ShoppingCart className="text-white w-6 h-6" />
          </div>
        </div>
        <div className="cols-span-1 border p-3 md:p-4 rounded-xl bg-white flex justify-between items-center">
          <div className="text">
            <h1 className="font-medium text-md md:text-lg text-gray-500">
              Total Transaksi
            </h1>
            <span className="text-sm -mt-1 text-gray-400 block mb-3">
              12/10/2025
            </span>
            <span className="font-bold text-xl">Rp 2.450.000</span>
          </div>
          <div className="icon p-3.5 bg-primary rounded-lg flex items-center h-fit shadow-lg">
            <Receipt className="text-white w-6 h-6" />
          </div>
        </div>
        <div className="cols-span-1 border p-3 md:p-4 rounded-xl bg-white flex justify-between items-center">
          <div className="text">
            <h1 className="font-medium text-md md:text-lg text-gray-500">
              Jumlah Obat
            </h1>
            <span className="text-sm -mt-1 text-gray-400 block mb-3">
              Total obat tersedia
            </span>
            <span className="font-bold text-xl">15 Jenis Obat</span>
          </div>
          <div className="icon p-3.5 bg-primary rounded-lg flex items-center h-fit shadow-lg">
            <Pill className="text-white w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-2 md:mt-4">
        <div className="col-span-1 md:col-span-2">
          <div className="cart-wrapper bg-white border border-gray-200 p-3 md:p-4 rounded-2xl">
            <h1 className="font-semibold text-lg md:text-xl -mb-4">
              Penjualan Mingguan
            </h1>
            <BarChart />
          </div>
        </div>
        <div className="col-span-1">
          <div className="wrapper bg-white border border-gray-200 p-3 md:p-4 rounded-2xl">
            <div className="header flex justify-between items-center mb-3">
              <h1 className="font-semibold text-lg md:text-xl">
                Transaksi Terbaru
              </h1>
              <Link
                href={"/"}
                className="p-2 border rounded-lg text-sm bg-primary text-white shadow-md hover:shadow-none hover:scale-95 transition-all duration-300"
              >
                Selengkapnya
              </Link>
            </div>
            <div className="card-list-section">
              {transactions.map((trx) => (
                <div
                  key={trx.id}
                  className="p-3 border rounded-xl mb-3 hover:shadow-sm transition"
                >
                  <div className="flex justify-between md:items-center">
                    <div>
                      <h2 className="font-semibold text-sm md:text-base">
                        <span className="text-black">{trx.id}</span>
                      </h2>
                      <p className="text-xs text-gray-500">
                        {trx.date} - {trx.cashier}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm md:text-base">
                        <span className="text-primary">
                          Rp {trx.total.toLocaleString()}
                        </span>
                      </p>
                      <Link
                        href={"/"}
                        className="text-xs text-gray-400 underline hover:underline mt-1"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
