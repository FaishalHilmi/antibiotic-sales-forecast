import { cookies } from "next/headers";
import TransaksiView from "./TransaksiView";

export default async function KelolaTransaksiPage() {
  const cookieStore = await cookies();

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

  if (!res.ok) {
    throw Error("Gagal fetch API");
  }

  const req = await res.json();
  const transactions = req.payload;
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Transaksi Penjualan</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data transaksi penjualan yang tersedia
        </p>
        <div className="table-wrapper p-4 mt-7 bg-white flex flex-col border border-gray-200 rounded-3xl">
          <TransaksiView transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
