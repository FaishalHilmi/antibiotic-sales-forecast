import { transactions } from "@/data/transaction";
import { LatestTransactionProps } from "@/types/transaction";
import { formatTanggal } from "@/utils/date";
import { formatRupiah } from "@/utils/formatCurrency";
import Link from "next/link";
import React from "react";

export default function RecentTransactions({
  latestTransaction,
}: LatestTransactionProps) {
  return (
    <div className="col-span-1">
      <div className="wrapper bg-white border border-gray-200 p-3 md:p-4 rounded-2xl">
        <div className="header flex justify-between items-center mb-3">
          <h1 className="font-semibold text-lg md:text-xl">
            Transaksi Terbaru
          </h1>
          <Link
            href={"/dashboard/transaksi"}
            className="p-2 border rounded-lg text-sm bg-primary text-white shadow-md hover:shadow-none hover:scale-95 transition-all duration-300"
          >
            Selengkapnya
          </Link>
        </div>
        <div className="card-list-section">
          {latestTransaction.length > 0 ? (
            latestTransaction.map((trx) => (
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
                      {formatTanggal(trx.createdAt)} - {trx.cashier.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm md:text-base">
                      <span className="text-primary">
                        {formatRupiah(Number(trx.totalAmount))}
                      </span>
                    </p>
                    <Link
                      href={`/dashboard/transaksi/${trx.id}`}
                      className="text-xs text-gray-400 underline hover:underline mt-1"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="font-medium text-center text-primary w-full block mt-4">
              Tidak ada data transaksi
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
