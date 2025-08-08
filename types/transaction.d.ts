export interface DataTransaction {
  id: string;
  cashierId: number;
  totalItems: number;
  totalAmount: string;
  paymentMethod: string;
  createdAt: string;
  deletedAt: string | null;
  details: DetailTransaction[];
  cashier: Cashier;
}

export interface DetailTransaction {
  id: number;
  transactionId: string;
  medicineId: number;
  quantity: number;
  unitPrice: string;
  subtotal: string;
  medicine: Medicine;
}

export interface Cashier {
  id: string;
  name: string;
}

export interface Medicine {
  name: string;
}

export interface TransactionProps {
  transaction: DataTransaction;
}
