export interface ReceiptItem {
  name: string;
  qty: number;
  price: string;
  subtotal: string;
}

export interface ReceiptData {
  transactionId: string;
  datetime: string;
  cashierName: string;
  items: ReceiptItem[];
  totalPayment: string;
}
