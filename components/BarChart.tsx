"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { weeklySalesProps } from "@/types/sales";

export default function BarChart({ weeklySales }: weeklySalesProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    const labels = weeklySales.map((sale) => sale.date);
    const totals = weeklySales.map((sale) => sale.total);

    const option = {
      xAxis: {
        type: "category",
        data: labels,
      },
      yAxis: {
        type: "value",
      },
      tooltip: { trigger: "axis" },
      series: [
        {
          data: totals,
          type: "bar",
          itemStyle: {
            color: "#00A49C",
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: "50%",
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
      },
    };

    chart.setOption(option);
    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full h-72" />;
}
