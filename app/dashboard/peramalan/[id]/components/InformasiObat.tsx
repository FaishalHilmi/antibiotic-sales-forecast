import { formatRupiah } from "@/utils/formatCurrency";

export default function InformasiObat({
  medicine,
}: {
  medicine: { name: string; category: string; price: number };
}) {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Informasi Obat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500">Nama</p>
          <p className="font-medium capitalize">{medicine.name}</p>
        </div>
        <div>
          <p className="text-gray-500">Kategori</p>
          <p className="font-medium capitalize">{medicine.category}</p>
        </div>
        <div>
          <p className="text-gray-500">Harga</p>
          <p className="font-medium">{formatRupiah(medicine.price)}</p>
        </div>
      </div>
    </div>
  );
}
