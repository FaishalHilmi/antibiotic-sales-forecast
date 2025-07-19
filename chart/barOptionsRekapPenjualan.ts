import { topObatData } from "@/data/rekapitulasi";

export const barOptionsRekapPenjualan = {
  title: { text: "5 Obat Terlaris", left: "center" },
  tooltip: { trigger: "axis" },
  xAxis: { type: "category", data: topObatData.map((d) => d.nama) },
  yAxis: { type: "value" },
  series: [
    {
      type: "bar",
      data: topObatData.map((d) => d.total),
      itemStyle: {
        color: "#00A49C",
        borderRadius: [4, 4, 0, 0],
      },
      label: { show: true, position: "top" },
      barWidth: "50%",
    },
  ],
};
