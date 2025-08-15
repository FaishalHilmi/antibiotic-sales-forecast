import { StockHistoryProps } from "@/types/stocks";

export default function RiwayatStok({
  stockHistory,
  setShowModaTambah,
}: StockHistoryProps) {
  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Riwayat Stok</h3>
        <button
          onClick={setShowModaTambah}
          className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-sm transition"
        >
          + Tambah Stok
        </button>
      </div>

      <div className="space-y-3">
        {stockHistory.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada riwayat penambahan stok.
          </p>
        ) : (
          stockHistory.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-3 rounded-lg border text-sm"
            >
              {item.action == "IN" ? (
                <div className="font-medium text-green-600">
                  + {item.quantity} {item.medicine.unit}
                </div>
              ) : (
                <div className="font-medium text-red-600">
                  - {item.quantity} {item.medicine.unit}
                </div>
              )}
              <div className="text-gray-500">{item.note}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
