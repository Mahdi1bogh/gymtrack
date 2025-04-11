"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkoutSession } from "@/lib/types";
import { getMockWorkouts } from "@/lib/mock-data";

export default function RecentWorkouts() {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchWorkouts = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = getMockWorkouts(5);
        setWorkouts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Dumbbell className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No workouts yet</h3>
        <p className="text-sm text-muted-foreground">
          Start logging your workouts to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card key={workout.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{workout.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(workout.date), "PPP")} • {workout.duration}{" "}
                  min
                </p>
              </div>
              <Badge>{workout.type}</Badge>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                {workout.exercises.length} exercises • {workout.totalSets} sets
                • {workout.totalReps} reps
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
