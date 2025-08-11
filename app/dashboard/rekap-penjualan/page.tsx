import { cookies } from "next/headers";
import RekapPenjualanView from "./RekapPenjualanView";

export default async function RekapPenjualanPage() {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-recap`,
    {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );
  const req = await res.json();

  if (!res.ok) {
    throw new Error(req.message || "Gagal fetch API");
  }

  const salesRecap = req.payload;

  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Penjualan</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data penjualan yang tersedia
        </p>
        <RekapPenjualanView salesRecap={salesRecap} />
      </div>
    </div>
  );
}
