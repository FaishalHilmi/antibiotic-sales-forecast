import { cookies } from "next/headers";
import DetailTransaksiView from "./DetailTransaksiView";
import { DataTransaction } from "@/types/transaction";

export default async function DetailTransaksiPage(props: {
  params: Promise<{ id: string }>; // sekarang params adalah Promise
}) {
  const cookieStore = await cookies();
  const { id } = await props.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/${id}`,
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
  const dataTransaction: DataTransaction = await req.payload;

  return (
    <div className="wrapper">
      <h2 className="text-2xl font-bold mb-1">Detail Transaksi Penjualan</h2>
      <p className="text-primary mb-6">
        Lihat informasi lengkap mengenai transaksi
      </p>
      <DetailTransaksiView transaction={dataTransaction} />
    </div>
  );
}
