import { LastSevenDaysProps } from "./summary";

export interface weeklySalesProps {
  weeklySales: LastSevenDaysProps[];
}

export interface SalesRecap {
  id: number;
  month: number;
  year: number;
  totalTransactions: number;
  totalSoldQuantity: number;
  grossRevenue: string;
  topSellingMedicine: string;
  createdAt: string;
  updatedAt: string;
  medicineId: number;
}

export interface RecapDetail {
  id: number;
  salesRecapId: number;
  quantitySold: number;
  unitPrice: string;
  totalRevenue: string;
  medicine: {
    name: string;
    unit: string;
  };
}

export interface SaleRecap extends SalesRecap {
  recapDetails: RecapDetail[];
}

export interface DataTopFiveMedicines {
  name: string;
  quantity: number;
}
