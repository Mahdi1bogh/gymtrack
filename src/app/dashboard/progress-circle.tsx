"use client";

import { useEffect, useRef } from "react";

interface ProgressCircleProps {
  percentage: number;
  size: number;
  strokeWidth: number;
}

export default function ProgressCircle({
  percentage,
  size,
  strokeWidth,
}: ProgressCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const scale = window.devicePixelRatio || 1;
    canvas.width = size * scale;
    canvas.height = size * scale;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(scale, scale);

    // Calculate dimensions
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - strokeWidth) / 2;

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#374151"; // gray-700
    ctx.lineWidth = strokeWidth;
    ctx.stroke();

    // Draw progress arc
    const startAngle = -0.5 * Math.PI; // Start from top
    const endAngle = startAngle + (percentage / 100) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = "#10b981"; // green-500
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Draw text in the center
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${percentage}%`, centerX, centerY - 10);

    // Draw subtext
    ctx.fillStyle = "#9ca3af"; // gray-400
    ctx.font = "14px Inter, sans-serif";
    ctx.fillText("1,250 ml", centerX, centerY + 15);
  }, [percentage, size, strokeWidth]);

  return <canvas ref={canvasRef} />;
}
