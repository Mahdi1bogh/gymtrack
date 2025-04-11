"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkoutPlan } from "@/lib/types";
import { getMockWorkoutPlans } from "@/lib/mock-data";

export default function WorkoutPlanList() {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPlans = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = getMockWorkoutPlans();
        setPlans(data);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
              {[...Array(7)].map((_, j) => (
                <Skeleton key={j} className="h-16 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">No workout plans found</h3>
        <p className="text-muted-foreground mb-4">
          Create your first workout plan to get started
        </p>
        <Link href="/plans/new">
          <Button>Create Workout Plan</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {plans.map((plan) => (
        <div key={plan.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>
            <Link href={`/plans/${plan.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" /> Edit Plan
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {plan.days.map((day, index) => (
              <div key={index} className="border rounded p-3">
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <h4 className="font-medium">{day.name}</h4>
                </div>
                {day.workout ? (
                  <p className="text-sm">{day.workout}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Rest Day</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
