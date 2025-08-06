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
