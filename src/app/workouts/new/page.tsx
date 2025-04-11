"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Exercise } from "@/lib/types";
import { toast } from "sonner";

export default function NewWorkoutPage() {
  const router = useRouter();
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [workoutDate, setWorkoutDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: "1", name: "", sets: [{ weight: "", reps: "" }] },
  ]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      { id: Date.now().toString(), name: "", sets: [{ weight: "", reps: "" }] },
    ]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
  };

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: [...exercise.sets, { weight: "", reps: "" }],
          };
        }
        return exercise;
      })
    );
  };

  const removeSet = (exerciseId: string, setIndex: number) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.filter((_, index) => index !== setIndex),
          };
        }
        return exercise;
      })
    );
  };

  const updateExerciseName = (exerciseId: string, name: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return { ...exercise, name };
        }
        return exercise;
      })
    );
  };

  const updateSetValue = (
    exerciseId: string,
    setIndex: number,
    field: "weight" | "reps",
    value: string
  ) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedSets = [...exercise.sets];
          updatedSets[setIndex] = { ...updatedSets[setIndex], [field]: value };
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!workoutName) {
      toast.error("Please enter a workout name");
      return;
    }

    if (!workoutType) {
      toast.error("Please select a workout type");
      return;
    }

    // In a real app, this would be an API call to save the workout
    console.log({
      name: workoutName,
      type: workoutType,
      date: workoutDate,
      duration: Number.parseInt(workoutDuration) || 0,
      notes: workoutNotes,
      exercises,
    });

    toast.success("Workout saved successfully");

    // Navigate back to workouts page
    router.push("/workouts");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Log New Workout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Workout Details</CardTitle>
                <CardDescription>
                  Enter the details of your workout session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workout-name">Workout Name</Label>
                    <Input
                      id="workout-name"
                      placeholder="e.g., Leg Day, Upper Body, etc."
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workout-type">Workout Type</Label>
                    <Select value={workoutType} onValueChange={setWorkoutType}>
                      <SelectTrigger id="workout-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="hiit">HIIT</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workout-date">Date</Label>
                    <Input
                      id="workout-date"
                      type="date"
                      value={workoutDate}
                      onChange={(e) => setWorkoutDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workout-duration">Duration (minutes)</Label>
                    <Input
                      id="workout-duration"
                      type="number"
                      placeholder="e.g., 60"
                      value={workoutDuration}
                      onChange={(e) => setWorkoutDuration(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workout-notes">Notes (optional)</Label>
                  <Textarea
                    id="workout-notes"
                    placeholder="Any notes about this workout..."
                    value={workoutNotes}
                    onChange={(e) => setWorkoutNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Exercises</CardTitle>
                <CardDescription>
                  Add the exercises you performed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-2 flex-1 mr-4">
                        <Label htmlFor={`exercise-${exercise.id}`}>
                          Exercise Name
                        </Label>
                        <Input
                          id={`exercise-${exercise.id}`}
                          placeholder="e.g., Bench Press, Squat, etc."
                          value={exercise.name}
                          onChange={(e) =>
                            updateExerciseName(exercise.id, e.target.value)
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeExercise(exercise.id)}
                        disabled={exercises.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-1">
                          <Label>Set</Label>
                        </div>
                        <div className="col-span-5">
                          <Label>Weight (kg)</Label>
                        </div>
                        <div className="col-span-5">
                          <Label>Reps</Label>
                        </div>
                        <div className="col-span-1"></div>
                      </div>

                      {exercise.sets.map((set, setIndex) => (
                        <div
                          key={setIndex}
                          className="grid grid-cols-12 gap-2 items-center"
                        >
                          <div className="col-span-1 text-center">
                            <span className="text-sm font-medium">
                              {setIndex + 1}
                            </span>
                          </div>
                          <div className="col-span-5">
                            <Input
                              type="number"
                              placeholder="Weight"
                              value={set.weight}
                              onChange={(e) =>
                                updateSetValue(
                                  exercise.id,
                                  setIndex,
                                  "weight",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-span-5">
                            <Input
                              type="number"
                              placeholder="Reps"
                              value={set.reps}
                              onChange={(e) =>
                                updateSetValue(
                                  exercise.id,
                                  setIndex,
                                  "reps",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-span-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeSet(exercise.id, setIndex)}
                              disabled={exercise.sets.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSet(exercise.id)}
                        className="w-full"
                      >
                        Add Set
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addExercise}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Exercise
                </Button>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/workouts">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Workout
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
