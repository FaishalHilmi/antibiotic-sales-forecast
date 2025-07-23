import Link from "next/link";
import DetailRiwayatPeramalanView from "./DetailRiwayatPeramalanView";

export default function DetailRiwayatPeramalanPage() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Detail Riwayat Peramalan</h2>
        <p className="text-primary mb-6">
          Hasil dan evaluasi peramalan penjualan obat per minggu
        </p>
        <div className="mb-6">
          <Link
            href={"/dashboard/peramalan"}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Kembali
          </Link>
        </div>
        <DetailRiwayatPeramalanView />
      </div>
    </div>
  );
}
