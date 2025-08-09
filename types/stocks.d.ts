export interface StockHistory {
  id: number;
  medicineId: number;
  action: string;
  quantity: number;
  note: string;
  date: string;
  medicine: {
    unit: string;
  };
}

export interface StockHistoryProps {
  stockHistory: StockHistory[];
  setShowModaTambah: () => void;
}
