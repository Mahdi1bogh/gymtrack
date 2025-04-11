"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { NutritionDay } from "@/lib/types";
import { getMockNutritionDay } from "@/lib/mock-data";

export default function NutritionOverview() {
  const [nutrition, setNutrition] = useState<NutritionDay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchNutrition = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = getMockNutritionDay();
        setNutrition(data);
      } finally {
        setLoading(false);
      }
    };

    fetchNutrition();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (!nutrition) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">
          No nutrition data available
        </h3>
        <p className="text-muted-foreground">
          Start logging your meals to see your nutrition overview
        </p>
      </div>
    );
  }

  const caloriePercentage = Math.min(
    100,
    (nutrition.caloriesConsumed / nutrition.calorieGoal) * 100
  );
  const proteinPercentage = Math.min(
    100,
    (nutrition.proteinConsumed / nutrition.proteinGoal) * 100
  );
  const carbsPercentage = Math.min(
    100,
    (nutrition.carbsConsumed / nutrition.carbsGoal) * 100
  );
  const fatPercentage = Math.min(
    100,
    (nutrition.fatConsumed / nutrition.fatGoal) * 100
  );

  const macroData = [
    { name: "Protein", value: nutrition.proteinConsumed * 4 }, // 4 calories per gram
    { name: "Carbs", value: nutrition.carbsConsumed * 4 }, // 4 calories per gram
    { name: "Fat", value: nutrition.fatConsumed * 9 }, // 9 calories per gram
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Calories</span>
            <span className="text-sm text-muted-foreground">
              {nutrition.caloriesConsumed} / {nutrition.calorieGoal} kcal
            </span>
          </div>
          <Progress value={caloriePercentage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Protein</span>
            <span className="text-sm text-muted-foreground">
              {nutrition.proteinConsumed}g / {nutrition.proteinGoal}g
            </span>
          </div>
          <Progress value={proteinPercentage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Carbs</span>
            <span className="text-sm text-muted-foreground">
              {nutrition.carbsConsumed}g / {nutrition.carbsGoal}g
            </span>
          </div>
          <Progress value={carbsPercentage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Fat</span>
            <span className="text-sm text-muted-foreground">
              {nutrition.fatConsumed}g / {nutrition.fatGoal}g
            </span>
          </div>
          <Progress value={fatPercentage} className="h-2" />
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={macroData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {macroData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value} kcal`}
              contentStyle={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "var(--foreground)" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
