"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { WeightEntry } from "@/lib/types";
import { getMockWeightData } from "@/lib/mock-data";

export default function WeightTracker() {
  const [weightData, setWeightData] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"1m" | "3m" | "6m" | "1y">("1m");

  useEffect(() => {
    // In a real app, this would be an API call with filtering
    const fetchWeightData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get mock data based on time range
        let days = 30;
        switch (timeRange) {
          case "1m":
            days = 30;
            break;
          case "3m":
            days = 90;
            break;
          case "6m":
            days = 180;
            break;
          case "1y":
            days = 365;
            break;
        }

        const data = getMockWeightData(days);
        setWeightData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchWeightData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end space-x-2">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (weightData.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">No weight data available</h3>
        <p className="text-muted-foreground mb-4">
          Start logging your weight to track your progress
        </p>
        <Link href="/metrics/new">
          <Button>Log Weight</Button>
        </Link>
      </div>
    );
  }

  // Calculate stats
  const currentWeight = weightData[weightData.length - 1].weight;
  const startWeight = weightData[0].weight;
  const weightChange = currentWeight - startWeight;
  const percentChange = (weightChange / startWeight) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-2xl font-bold">{currentWeight.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">kg</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Change</p>
            <p
              className={`text-2xl font-bold ${
                weightChange < 0
                  ? "text-green-500"
                  : weightChange > 0
                  ? "text-red-500"
                  : ""
              }`}
            >
              {weightChange > 0 ? "+" : ""}
              {weightChange.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">kg</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Percent</p>
            <p
              className={`text-2xl font-bold ${
                percentChange < 0
                  ? "text-green-500"
                  : percentChange > 0
                  ? "text-red-500"
                  : ""
              }`}
            >
              {percentChange > 0 ? "+" : ""}
              {percentChange.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">change</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === "1m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("1m")}
          >
            1M
          </Button>
          <Button
            variant={timeRange === "3m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("3m")}
          >
            3M
          </Button>
          <Button
            variant={timeRange === "6m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("6m")}
          >
            6M
          </Button>
          <Button
            variant={timeRange === "1y" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("1y")}
          >
            1Y
          </Button>
        </div>
      </div>

      <div className="h-[400px]">
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
                return format(d, "PPP");
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
    </div>
  );
}
