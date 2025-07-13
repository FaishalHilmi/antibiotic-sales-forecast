export interface StockHistoryProps {
  riwayatStok: { id: number; jumlah: number; keterangan: string }[];
  setShowModaTambah: () => void;
}
