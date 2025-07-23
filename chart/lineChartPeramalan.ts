export interface PeramalanItem {
  periode: string;
  aktual: number | null;
  peramalan: number | null;
}

export const getForecastChartOptions = (dataPeramalan: PeramalanItem[]) => {
  return {
    tooltip: { trigger: "axis" },
    legend: { data: ["Aktual", "Peramalan"] },
    xAxis: {
      type: "category",
      data: dataPeramalan.map((d) => d.periode),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Aktual",
        type: "line",
        data: dataPeramalan.map((d) => d.aktual),
      },
      {
        name: "Peramalan",
        type: "line",
        data: dataPeramalan.map((d) => d.peramalan),
      },
    ],
  };
};
