export interface WeeklySalesData {
  weekNumber: number;
  year: number;
  quantitySold: number;
}

export interface ForecastResult {
  usedPeriod: number;
  avgMape: number;
  avgMae: number;
  bestWeights: number[];
  results: {
    periodLabel: string;
    actualValue: number | null;
    forecastValue: number | null;
    mape: number | null;
    mae: number | null;
  }[];
}

export interface ForecastItem {
  periodLabel: string;
  actualValue: number | null;
  forecastValue: number | null;
  mape: number | null;
  mae: number | null;
}

export interface ForecastMedicines {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  unit: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ForecastSummary {
  weightMethod: string;
  avgMae: string;
  avgMape: string;
}

export interface ForecastResult {
  id: number;
  historyId: number;
  periodLabel: string;
  actualValue: string;
  forecastValue: string;
  mape: string;
  mae: string;
}
