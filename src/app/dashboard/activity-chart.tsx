"use client";

import { useEffect, useRef } from "react";

export default function ActivityChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Data for the chart
    const data = [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 70 },
      { month: "Mar", value: 50 },
      { month: "Apr", value: 65 },
      { month: "May", value: 60 },
      { month: "Jun", value: 32 },
      { month: "Jul", value: 11 },
      { month: "Aug", value: 10 },
    ];

    // Chart dimensions
    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;
    const barWidth = chartWidth / data.length / 2;
    const spacing = barWidth;

    // Draw bars
    data.forEach((item, index) => {
      const x = 20 + index * (barWidth + spacing) * 2;
      const barHeight = (item.value / 100) * chartHeight;
      const y = canvas.height - 20 - barHeight;

      // Draw bar
      ctx.fillStyle = getBarColor(item.value);
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 5);
      ctx.fill();

      // Draw month label
      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(item.month, x + barWidth / 2, canvas.height - 5);
    });

    // Helper function to get bar color based on value
    function getBarColor(value: number) {
      if (value >= 60) return "#10b981"; // green-500
      if (value >= 30) return "#6366f1"; // indigo-500
      return "#ef4444"; // red-500
    }
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl p-4 h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
}
