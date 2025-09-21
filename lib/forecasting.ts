import {
  ForecastCalculationResult,
  ForecastItem,
  WeeklySalesData,
} from "@/types/forecasting";
import { meanAbsoluteError, meanAbsolutePercentageError } from "./errors";
import { weightedMovingAverage } from "./wieghtMovingAverage";

export function calculateForecast(
  salesData: WeeklySalesData[]
): ForecastCalculationResult {
  // const sortedData = [...salesData].sort((a, b) => {
  //   if (a.year !== b.year) return a.year - b.year;
  //   return a.weekNumber - b.weekNumber;
  // });
  const sortedData = [...salesData].sort((a, b) => a.period - b.period);

  const data = sortedData.map((d) => d.quantitySold);

  const weightSets: Record<number, number[][]> = {
    2: [
      [0.7, 0.3],
      [0.6, 0.4],
      [0.8, 0.2],
      [0.9, 0.1],
    ],
    3: [
      [0.7, 0.2, 0.1],
      [0.5, 0.3, 0.2],
      [0.6, 0.3, 0.1],
    ],
  };

  let bestN = 0;
  let bestWeights: number[] = [];
  let bestMAPE = Infinity;
  let bestMAE = Infinity;
  let bestForecast: number[] = [];

  for (const n of [2, 3]) {
    for (const weights of weightSets[n]) {
      const forecast = weightedMovingAverage(data, weights);
      const actual = data.slice(n);
      const mape = meanAbsolutePercentageError(actual, forecast);
      const mae = meanAbsoluteError(actual, forecast);

      if (mape < bestMAPE) {
        bestN = n;
        bestWeights = weights;
        bestMAPE = mape;
        bestMAE = mae;
        bestForecast = forecast;
      }
    }
  }

  const extendedData = [...data];
  for (let i = 0; i < 4; i++) {
    let next = 0;
    for (let j = 0; j < bestN; j++) {
      next += extendedData[extendedData.length - j - 1] * bestWeights[j];
    }
    extendedData.push(next);
  }

  const futureForecast = extendedData.slice(-4);

  const results: ForecastItem[] = data.map((value, index) => {
    const hasForecast = index >= bestN;
    const forecastIndex = index - bestN;
    const forecastValue = hasForecast
      ? Number(bestForecast[forecastIndex].toFixed(2))
      : null;
    const mape = hasForecast
      ? Number(Math.abs(((value - forecastValue!) / value) * 100).toFixed(3))
      : null;
    const mae = hasForecast
      ? Number(Math.abs(value - forecastValue!).toFixed(3))
      : null;

    return {
      periodLabel: `${index + 1}`,
      actualValue: value,
      forecastValue,
      mape,
      mae,
    };
  });

  for (let i = 0; i < futureForecast.length; i++) {
    results.push({
      periodLabel: `${data.length + i + 1} (F)`,
      actualValue: null,
      forecastValue: Number(futureForecast[i].toFixed(2)),
      mape: null,
      mae: null,
    });
  }

  return {
    usedPeriod: bestN,
    avgMape: Number(bestMAPE.toFixed(3)),
    avgMae: Number(bestMAE.toFixed(3)),
    bestWeights,
    results,
  };
}
