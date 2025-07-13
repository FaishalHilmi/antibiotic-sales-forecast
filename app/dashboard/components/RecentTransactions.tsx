import { transactions } from "@/data/transaction";
import Link from "next/link";
import React from "react";

export default function RecentTransactions() {
  return (
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
  );
}
