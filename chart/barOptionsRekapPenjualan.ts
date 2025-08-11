import { DataTopFiveMedicines } from "@/types/sales";

export const barOptionsRekapPenjualan = (medicine: DataTopFiveMedicines[]) => {
  return {
    title: { text: "5 Obat Terlaris", left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: medicine.map((d) => d.name) },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        data: medicine.map((d) => d.quantity),
        itemStyle: {
          color: "#00A49C",
          borderRadius: [4, 4, 0, 0],
        },
        label: { show: true, position: "top" },
        barWidth: "50%",
      },
    ],
  };
};
