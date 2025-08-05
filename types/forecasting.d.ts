export interface WeeklySalesData {
  weekNumber: number;
  year: number;
  quantitySold: number;
}

export interface ForecastResult {
  bestN: number;
  bestWeights: number[];
  evaluation: {
    mape: number;
    mae: number;
  };
  forecast: number[];
}
