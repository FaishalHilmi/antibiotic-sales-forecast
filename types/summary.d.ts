export interface LastSevenDaysProps {
  date: string;
  day: string;
  total: number;
}

export interface Cashier {
  name: string;
}

export interface LatestTransactions {
  id: string;
  cashierId: number;
  totalItems: number;
  totalAmount: string;
  paymentMethod: string;
  createdAt: string;
  deletedAt: string | null;
  cashier: Cashier;
}

export interface DataSummary {
  total_item: number | null;
  total_revenue: number | null;
  total_medicines: number | null;
  seven_days_sales: lastSevenDaysProps[];
  latest_transactions: LatestTransactions[];
}

export interface summaryProps {
  summary: DataSummary;
}
