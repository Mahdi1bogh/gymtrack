"use client";

import { useState, useEffect } from "react";
import { Utensils } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { NutritionDay } from "@/lib/types";
import { getMockNutritionDay } from "@/lib/mock-data";

export default function NutritionSummary() {
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
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!nutrition) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Utensils className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No nutrition data</h3>
        <p className="text-sm text-muted-foreground">
          Start logging your meals to see your nutrition summary.
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

  return (
    <div className="space-y-4">
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
  );
}
