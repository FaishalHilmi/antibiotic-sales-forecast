export default function InformasiObat({
  informasiObat,
}: {
  informasiObat: { nama: string; kategori: string; harga: number };
}) {
  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Informasi Obat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500">Nama</p>
          <p className="font-medium">{informasiObat.nama}</p>
        </div>
        <div>
          <p className="text-gray-500">Kategori</p>
          <p className="font-medium">{informasiObat.kategori}</p>
        </div>
        <div>
          <p className="text-gray-500">Harga</p>
          <p className="font-medium">{formatRupiah(informasiObat.harga)}</p>
        </div>
      </div>
    </div>
  );
}
