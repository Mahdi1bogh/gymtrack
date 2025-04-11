"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Meal } from "@/lib/types";
import { getMockMeals } from "@/lib/mock-data";

interface MealListProps {
  period: "today" | "yesterday" | "week";
}

export default function MealList({ period }: MealListProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call with filtering
    const fetchMeals = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get mock data based on period
        let count = 0;
        switch (period) {
          case "today":
            count = 4;
            break;
          case "yesterday":
            count = 3;
            break;
          case "week":
            count = 10;
            break;
        }

        const data = getMockMeals(count, period);
        setMeals(data);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [period]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-[70%] mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="text-center py-8">
        <Utensils className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="text-lg font-medium mt-4 mb-2">No meals found</h3>
        <p className="text-muted-foreground mb-4">
          {period === "today"
            ? "You haven't logged any meals today."
            : period === "yesterday"
            ? "You didn't log any meals yesterday."
            : "You haven't logged any meals in the past week."}
        </p>
        <Link href="/nutrition/new">
          <Button>Log a Meal</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <div key={meal.id} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{meal.name}</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(meal.date), "PPP p")}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{meal.calories} kcal</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              Protein: {meal.protein}g • Carbs: {meal.carbs}g • Fat: {meal.fat}g
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <Link href={`/nutrition/${meal.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
