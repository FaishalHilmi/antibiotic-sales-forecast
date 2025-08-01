import TransaksiView from "./TransaksiView";

export default function KelolaTransaksiPage() {
  return (
    <div>
      <div className="wrapper">
        <h2 className="text-2xl font-bold mb-1">Kelola Transaksi Penjualan</h2>
        <p className="text-primary mb-4">
          Lihat dan kelola data transaksi penjualan yang tersedia
        </p>
        <div className="table-wrapper p-4 mt-7 bg-white flex flex-col border border-gray-200 rounded-3xl">
          <TransaksiView />
        </div>
      </div>
    </div>
  );
}
