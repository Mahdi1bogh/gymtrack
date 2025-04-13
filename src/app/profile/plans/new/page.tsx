"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, GripVertical, Settings, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ExerciseSidebar from "@/components/exercise-sidebar";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface Exercise {
  id: string;
  name: string;
  category: string;
  sets?: number;
  reps?: number;
  weight?: number;
}

interface DayWorkout {
  name: string;
  exercises: Exercise[];
}

export default function NewPlanPage() {
  const router = useRouter();
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [days, setDays] = useState<DayWorkout[]>(
    DAYS_OF_WEEK.map((day) => ({ name: day, exercises: [] }))
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dayIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    const exerciseData = e.dataTransfer.getData("exercise");
    if (exerciseData) {
      const exercise: Exercise = JSON.parse(exerciseData);
      exercise.sets = 3;
      exercise.reps = 10;
      exercise.weight = 5;

      const updatedDays = [...days];
      updatedDays[dayIndex].exercises = [
        ...updatedDays[dayIndex].exercises,
        exercise,
      ];
      setDays(updatedDays);
    }
  };

  const removeExercise = (dayIndex: number, exerciseIndex: number) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setDays(updatedDays);
  };

  const moveExercise = (
    fromDay: number,
    fromIndex: number,
    toDay: number,
    toIndex: number
  ) => {
    const updatedDays = [...days];
    const [movedExercise] = updatedDays[fromDay].exercises.splice(fromIndex, 1);
    updatedDays[toDay].exercises.splice(toIndex, 0, movedExercise);
    setDays(updatedDays);
  };

  const updateExerciseDetails = (
    dayIndex: number,
    exerciseIndex: number,
    field: "sets" | "reps" | "weight",
    value: number
  ) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].exercises[exerciseIndex] = {
      ...updatedDays[dayIndex].exercises[exerciseIndex],
      [field]: value,
    };
    setDays(updatedDays);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!planName) {
      toast.error("Please enter a plan name");
      return;
    }

    console.log({
      name: planName,
      description: planDescription,
      days,
    });

    toast.success("Workout plan saved successfully");
    router.push("/plans");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="border-l border-border p-2">
        <ExerciseSidebar />
      </div>
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Create Workout Plan</h1>
                <p className="text-sm text-muted-foreground">
                  Drag and drop exercises to create your weekly routine
                </p>
              </div>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Settings className="mr-2 h-4 w-4" /> Plan Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Plan Details</DialogTitle>
                      <DialogDescription>
                        Enter the details for your workout plan
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="plan-name">Plan Name</Label>
                        <Input
                          id="plan-name"
                          placeholder="e.g., Push/Pull/Legs, Upper/Lower, etc."
                          value={planName}
                          onChange={(e) => setPlanName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="plan-description">
                          Description (optional)
                        </Label>
                        <Textarea
                          id="plan-description"
                          placeholder="Describe your workout plan..."
                          value={planDescription}
                          onChange={(e) => setPlanDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Link href="/plans">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" /> Save Plan
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto py-6">
            <div className="flex overflow-x-auto pb-4 px-4 gap-4 h-full scrollbar-thin scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50 scrollbar-track-transparent">
              {days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="flex flex-col h-full min-w-[300px] max-w-[300px] group/column"
                >
                  <div className="font-medium mb-2 text-center bg-card p-2 rounded-t-lg shadow-sm group-hover/column:bg-accent transition-colors">
                    {day.name}
                  </div>
                  <div
                    className="flex-1 bg-card/50 rounded-b-lg p-4 space-y-3 overflow-y-auto border border-border shadow-sm group-hover/column:border-accent transition-colors scrollbar-thin scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50 scrollbar-track-transparent min-h-[500px]"
                    onDragOver={(e) => {
                      handleDragOver(e);
                      e.currentTarget.classList.add(
                        "ring-2",
                        "ring-primary",
                        "ring-opacity-50"
                      );
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove(
                        "ring-2",
                        "ring-primary",
                        "ring-opacity-50"
                      );
                    }}
                    onDrop={(e) => {
                      e.currentTarget.classList.remove(
                        "ring-2",
                        "ring-primary",
                        "ring-opacity-50"
                      );
                      handleDrop(dayIndex, e);
                    }}
                  >
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <div
                        key={exerciseIndex}
                        draggable
                        className="group bg-card rounded-lg p-3 cursor-move hover:bg-accent transition-colors shadow-sm mb-4"
                        onDragStart={(e) => {
                          e.dataTransfer.setData(
                            "move",
                            JSON.stringify({
                              fromDay: dayIndex,
                              fromIndex: exerciseIndex,
                            })
                          );
                          e.currentTarget.classList.add(
                            "opacity-50",
                            "scale-95"
                          );
                        }}
                        onDragEnd={(e) => {
                          e.currentTarget.classList.remove(
                            "opacity-50",
                            "scale-95"
                          );
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          const target = e.currentTarget;
                          const rect = target.getBoundingClientRect();
                          const midY = rect.top + rect.height / 2;

                          target.classList.remove(
                            "border-t-2",
                            "border-b-2",
                            "border-primary"
                          );
                          if (e.clientY < midY) {
                            target.classList.add(
                              "border-t-2",
                              "border-primary"
                            );
                          } else {
                            target.classList.add(
                              "border-b-2",
                              "border-primary"
                            );
                          }
                        }}
                        onDragLeave={(e) => {
                          e.currentTarget.classList.remove(
                            "border-t-2",
                            "border-b-2",
                            "border-primary"
                          );
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const moveData = JSON.parse(
                            e.dataTransfer.getData("move")
                          );
                          const targetRect =
                            e.currentTarget.getBoundingClientRect();
                          const targetIndex =
                            e.clientY < targetRect.top + targetRect.height / 2
                              ? exerciseIndex
                              : exerciseIndex + 1;
                          moveExercise(
                            moveData.fromDay,
                            moveData.fromIndex,
                            dayIndex,
                            targetIndex
                          );
                          e.currentTarget.classList.remove(
                            "border-t-2",
                            "border-b-2",
                            "border-primary"
                          );
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                              <div>
                                <div className="font-medium">
                                  {exercise.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {exercise.category}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() =>
                                removeExercise(dayIndex, exerciseIndex)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {/* Sets */}
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            <div className="flex flex-col items-center bg-blue-500/10 dark:bg-blue-500/20 p-2 rounded-lg">
                              <div className="text-xs text-blue-500 dark:text-blue-400 font-medium">
                                Sets
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-blue-500 hover:text-blue-600 hover:bg-blue-500/20"
                                  onClick={() =>
                                    updateExerciseDetails(
                                      dayIndex,
                                      exerciseIndex,
                                      "sets",
                                      Math.max(1, (exercise.sets || 3) - 1)
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-6 text-center font-medium text-blue-500">
                                  {exercise.sets || 3}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-blue-500 hover:text-blue-600 hover:bg-blue-500/20"
                                  onClick={() =>
                                    updateExerciseDetails(
                                      dayIndex,
                                      exerciseIndex,
                                      "sets",
                                      (exercise.sets || 3) + 1
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex flex-col items-center bg-green-500/10 dark:bg-green-500/20 p-2 rounded-lg">
                              <div className="text-xs text-green-500 dark:text-green-400 font-medium">
                                Reps
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-green-500 hover:text-green-600 hover:bg-green-500/20"
                                  onClick={() =>
                                    updateExerciseDetails(
                                      dayIndex,
                                      exerciseIndex,
                                      "reps",
                                      Math.max(1, (exercise.reps || 10) - 1)
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-6 text-center font-medium text-green-500">
                                  {exercise.reps || 10}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-green-500 hover:text-green-600 hover:bg-green-500/20"
                                  onClick={() =>
                                    updateExerciseDetails(
                                      dayIndex,
                                      exerciseIndex,
                                      "reps",
                                      (exercise.reps || 10) + 1
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex flex-col items-center bg-purple-500/10 dark:bg-purple-500/20 p-2 rounded-lg">
                              <div className="text-xs text-purple-500 dark:text-purple-400 font-medium">
                                Weight
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-purple-500 hover:text-purple-600 hover:bg-purple-500/20"
                                  onClick={() =>
                                    updateExerciseDetails(
                                      dayIndex,
                                      exerciseIndex,
                                      "weight",
                                      Math.max(0, (exercise.weight || 0) - 2.5)
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-6 text-center font-medium text-purple-500">
                                  {exercise.weight || 0}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-purple-500 hover:text-purple-600 hover:bg-purple-500/20"
                                  onClick={() =>
                                    updateExerciseDetails(
                                      dayIndex,
                                      exerciseIndex,
                                      "weight",
                                      (exercise.weight || 0) + 2.5
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {day.exercises.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-sm text-muted-foreground p-8 border-2 border-dashed border-border rounded-lg min-h-[400px]">
                        <div className="mb-2 text-lg">Drop exercises here</div>
                        <div className="text-xs">
                          Drag exercises from the sidebar
                        </div>
                      </div>
                    )}

                    <div className="h-16 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground mt-4">
                      <div>Drop to add at the end</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
