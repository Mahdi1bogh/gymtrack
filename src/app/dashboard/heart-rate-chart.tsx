/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef } from "react";

export default function HeartRateChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Data for the chart (heart rate values)
    const data = [60, 65, 70, 68, 72, 75, 90, 85, 80, 78, 75, 70, 65];

    // Chart dimensions
    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;
    const stepX = chartWidth / (data.length - 1);

    // Draw axes
    ctx.strokeStyle = "#374151"; // gray-700
    ctx.lineWidth = 1;

    // Draw days of week
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
    days.forEach((day, index) => {
      const x = 20 + (index * chartWidth) / (days.length - 1);

      // Draw day label
      ctx.fillStyle = "#9ca3af"; // gray-400
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(day, x, canvas.height - 5);
    });

    // Draw heart rate values on y-axis
    const rates = ["0b", "40b", "80b", "90b"];
    rates.forEach((rate, index) => {
      const y =
        20 + ((rates.length - 1 - index) * chartHeight) / (rates.length - 1);

      // Draw rate label
      ctx.fillStyle = "#9ca3af"; // gray-400
      ctx.font = "12px Inter, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(rate, 15, y + 4);
    });

    // Draw the heart rate line
    ctx.beginPath();
    ctx.moveTo(20, canvas.height - 20 - (data[0] / 100) * chartHeight);

    for (let i = 1; i < data.length; i++) {
      const x = 20 + i * stepX;
      const y = canvas.height - 20 - (data[i] / 100) * chartHeight;

      // Create a curved line
      if (i > 0 && i < data.length - 1) {
        const prevX = 20 + (i - 1) * stepX;
        const prevY = canvas.height - 20 - (data[i - 1] / 100) * chartHeight;

        const nextX = 20 + (i + 1) * stepX;
        const nextY = canvas.height - 20 - (data[i + 1] / 100) * chartHeight;

        // Calculate control points for the curve
        const cpX1 = prevX + (x - prevX) * 0.5;
        const cpY1 = prevY;
        const cpX2 = x - (x - prevX) * 0.5;
        const cpY2 = y;

        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    // Style the line
    ctx.strokeStyle = "#10b981"; // green-500
    ctx.lineWidth = 2;
    ctx.stroke();

    // Create gradient fill under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)"); // green-500 with opacity
    gradient.addColorStop(1, "rgba(16, 185, 129, 0)");

    // Fill area under the curve
    ctx.lineTo(20 + (data.length - 1) * stepX, canvas.height - 20);
    ctx.lineTo(20, canvas.height - 20);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw the current point (highlighted)
    const highlightIndex = Math.floor(data.length * 0.7); // 70% along the line
    const highlightX = 20 + highlightIndex * stepX;
    const highlightY =
      canvas.height - 20 - (data[highlightIndex] / 100) * chartHeight;

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(highlightX, highlightY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(16, 185, 129, 0.2)"; // green-500 with opacity
    ctx.fill();

    // Draw inner circle
    ctx.beginPath();
    ctx.arc(highlightX, highlightY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#10b981"; // green-500
    ctx.fill();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
