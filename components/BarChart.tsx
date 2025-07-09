"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function BarChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
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