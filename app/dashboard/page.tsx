import { Pill, Receipt, ShoppingCart } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Halo, Admin 👋</h2>
      <p className="text-gray-500 mb-4 md:mb-6">
        Ini ringkasan penjualan dan aktivitas hari ini.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        <div className="cols-span-1 border p-3 md:p-4 rounded-xl bg-white flex justify-between items-center">
          <div className="text">
            <h1 className="font-medium text-md md:text-lg text-gray-500">
              Total Penjualan
            </h1>
            <span className="text-sm -mt-1 text-gray-400 block mb-3">
              12/10/2025
            </span>
            <span className="font-bold text-xl">37 Produk</span>
          </div>
          <div className="icon p-3.5 bg-primary rounded-lg flex items-center h-fit shadow-lg">
            <ShoppingCart className="text-white w-6 h-6" />
          </div>
        </div>
        <div className="cols-span-1 border p-3 md:p-4 rounded-xl bg-white flex justify-between items-center">
          <div className="text">
            <h1 className="font-medium text-md md:text-lg text-gray-500">
              Total Transaksi
            </h1>
            <span className="text-sm -mt-1 text-gray-400 block mb-3">
              12/10/2025
            </span>
            <span className="font-bold text-xl">Rp 2.450.000</span>
          </div>
          <div className="icon p-3.5 bg-primary rounded-lg flex items-center h-fit shadow-lg">
            <Receipt className="text-white w-6 h-6" />
          </div>
        </div>
        <div className="cols-span-1 border p-3 md:p-4 rounded-xl bg-white flex justify-between items-center">
          <div className="text">
            <h1 className="font-medium text-md md:text-lg text-gray-500">
              Jumlah Obat
            </h1>
            <span className="text-sm -mt-1 text-gray-400 block mb-3">
              Total obat tersedia
            </span>
            <span className="font-bold text-xl">15 Jenis Obat</span>
          </div>
          <div className="icon p-3.5 bg-primary rounded-lg flex items-center h-fit shadow-lg">
            <Pill className="text-white w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
