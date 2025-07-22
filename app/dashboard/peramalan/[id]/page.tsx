import Link from "next/link";
import InformasiObat from "./components/InformasiObat";
import RiwayatPeramalan from "./components/RiwayatPeramalan";

export default function DetailPeramalanPage() {
  const informasiObat = {
    nama: "Paracetamol",
    kategori: "Analgesik",
    harga: 5000,
  };

  const riwayatPeramalan = [
    {
      id: 1,
      tanggalPeramalan: "2024-07-01",
      // otomatis hitung 4 minggu ke depan (28 hari)
      periodePeramalan: "01 Juli 2024 - 28 Juli 2024",
    },
    {
      id: 2,
      tanggalPeramalan: "2024-07-08",
      periodePeramalan: "08 Juli 2024 - 04 Agustus 2024",
    },
    {
      id: 3,
      tanggalPeramalan: "2024-09-15",
      periodePeramalan: "15 September 2024 - 12 Oktober 2024",
    },
  ];

  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Detail Obat Peramalan</h2>
        <p className="text-primary mb-6">
          Informasi Obat dan Riwayat Peramalan Penjualan
        </p>
        <div className="mb-6">
          <Link
            href={"/dashboard/peramalan"}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Kembali
          </Link>
        </div>
        {/* Informasi Singkat */}
        <InformasiObat informasiObat={informasiObat} />
        {/* Riwayat Peramalan */}
        <RiwayatPeramalan riwayatPeramalan={riwayatPeramalan} />
      </div>
    </div>
  );
}
