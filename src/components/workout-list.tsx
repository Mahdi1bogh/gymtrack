"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkoutSession } from "@/lib/types";
import { getMockWorkouts } from "@/lib/mock-data";

interface WorkoutListProps {
  filter: "all" | "strength" | "cardio" | "flexibility";
}

export default function WorkoutList({ filter }: WorkoutListProps) {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call with filtering
    const fetchWorkouts = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = getMockWorkouts(10);

        // Filter workouts based on the selected filter
        if (filter !== "all") {
          const filtered = data.filter(
            (workout) => workout.type.toLowerCase() === filter
          );
          setWorkouts(filtered);
        } else {
          setWorkouts(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [filter]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
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

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">No workouts found</h3>
        <p className="text-muted-foreground mb-4">
          {filter === "all"
            ? "You haven't logged any workouts yet."
            : `You haven't logged any ${filter} workouts yet.`}
        </p>
        <Link href="/workouts/new">
          <Button>Log a Workout</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div key={workout.id} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{workout.name}</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(workout.date), "PPP")} • {workout.duration} min
              </p>
            </div>
            <Badge>{workout.type}</Badge>
          </div>
          <div className="mt-2">
            <p className="text-sm">
              {workout.exercises.length} exercises • {workout.totalSets} sets •{" "}
              {workout.totalReps} reps
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <Link href={`/workouts/${workout.id}`}>
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
