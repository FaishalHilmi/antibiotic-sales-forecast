import Link from "next/link";
import DetailRiwayatPeramalanView from "./DetailRiwayatPeramalanView";
import { cookies } from "next/headers";
import { error } from "console";

export default async function DetailRiwayatPeramalanPage({
  params,
}: {
  params: Promise<{ id: string; riwayatId: string }>;
}) {
  const cookieStore = await cookies();
  const { id: medicineId, riwayatId: historyId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/forecast/${medicineId}/history/${historyId}`,
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

  const forecastingResultDetail = req.payload;

  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Detail Riwayat Peramalan</h2>
        <p className="text-primary mb-6">
          Hasil dan evaluasi peramalan penjualan obat per minggu
        </p>
        <div className="mb-6">
          <Link
            href={`/dashboard/peramalan/${medicineId}`}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Kembali
          </Link>
        </div>
        <DetailRiwayatPeramalanView
          forecastingResultDetail={forecastingResultDetail}
        />
      </div>
    </div>
  );
}
