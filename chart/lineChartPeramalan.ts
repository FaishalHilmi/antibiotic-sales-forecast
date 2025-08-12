import { ForecastResult } from "@/types/forecasting";

export interface PeramalanItem {
  periode: string;
  aktual: number | null;
  peramalan: number | null;
}

export const getForecastChartOptions = (forecastResult: ForecastResult[]) => {
  return {
    tooltip: { trigger: "axis" },
    legend: { data: ["Aktual", "Peramalan"] },
    xAxis: {
      type: "category",
      data: forecastResult.map((d) => d.periodLabel),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Aktual",
        type: "line",
        data: forecastResult.map((d) => d.actualValue),
      },
      {
        name: "Peramalan",
        type: "line",
        data: forecastResult.map((d) => d.forecastValue),
      },
    ],
  };
};
