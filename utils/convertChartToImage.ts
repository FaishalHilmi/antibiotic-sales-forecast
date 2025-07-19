import ReactECharts from "echarts-for-react";

export function getChartDataUrl(
  chartRef: React.RefObject<ReactECharts | null>
) {
  const instance = chartRef.current?.getEchartsInstance();
  if (!instance) return "";

  return instance.getDataURL({
    type: "png",
    pixelRatio: 2,
    backgroundColor: "#fff",
  });
}
