export default function InformasiUmum({
  createdAt,
  jumlahTransaksi,
  totalObat,
  totalHarga,
  topObat,
}: {
  createdAt: string;
  jumlahTransaksi: number;
  totalObat: number;
  totalHarga: string;
  topObat: string;
}) {
  return (
    <table className="text-sm w-full table-fixed">
      <tbody className="space-y-1">
        <tr>
          <td className="font-semibold w-40">Tanggal Dibuat</td>
          <td>: {createdAt}</td>
        </tr>
        <tr>
          <td className="font-semibold">Jumlah Transaksi</td>
          <td>: {jumlahTransaksi} Transaksi</td>
        </tr>
        <tr>
          <td className="font-semibold">Total Obat Terjual</td>
          <td>: {totalObat} Item</td>
        </tr>
        <tr>
          <td className="font-semibold">Pendapatan Kotor</td>
          <td>: {totalHarga}</td>
        </tr>
        <tr>
          <td className="font-semibold">Obat Terbanyak Terjual</td>
          <td>: {topObat}</td>
        </tr>
      </tbody>
    </table>
  );
}
