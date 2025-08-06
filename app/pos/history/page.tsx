import { cookies } from "next/headers";
import RiwayatPenjualanView from "./RiwayatPenjualanView";

export default async function RiwayatPenjualanPage() {
  const cookieStore = cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction`,
    {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!res) {
    throw new Error("Gagal fetch API");
  }

  const req = await res.json();
  const dataTransactions = req.payload;

  return (
    <div>
      <div className="wrapper">
        <h1 className="font-bold text-lg md:text-3xl mb-1">
          Riwayat Transaksi
        </h1>
        <span className="block text-primary">
          Catatan lengkap dari penjualan yang telah diselesaikan
        </span>
        <RiwayatPenjualanView transactions={dataTransactions} />
      </div>
    </div>
  );
}
