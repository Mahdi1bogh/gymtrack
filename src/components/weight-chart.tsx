"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import type { WeightEntry } from "@/lib/types";
import { getMockWeightData } from "@/lib/mock-data";

export default function WeightChart() {
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchWeightData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = getMockWeightData(30);
        setWeightData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchWeightData();
  }, []);

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (weightData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center">
        <h3 className="text-lg font-medium">No weight data</h3>
        <p className="text-sm text-muted-foreground">
          Start logging your weight to see your progress.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={weightData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date);
              return `${d.getMonth() + 1}/${d.getDate()}`;
            }}
            stroke="var(--foreground)"
          />
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            stroke="var(--foreground)"
          />
          <Tooltip
            labelFormatter={(date) => {
              const d = new Date(date);
              return d.toLocaleDateString();
            }}
            formatter={(value) => [`${value} kg`, "Weight"]}
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
