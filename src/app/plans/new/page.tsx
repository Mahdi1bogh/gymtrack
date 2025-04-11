"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function NewPlanPage() {
  const router = useRouter();
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [days, setDays] = useState(
    DAYS_OF_WEEK.map((day) => ({ name: day, workout: "" }))
  );

  const updateDayWorkout = (index: number, workout: string) => {
    const updatedDays = [...days];
    updatedDays[index] = { ...updatedDays[index], workout };
    setDays(updatedDays);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!planName) {
      toast.error("Please enter a plan name");
      return;
    }

    // In a real app, this would be an API call to save the plan
    console.log({
      name: planName,
      description: planDescription,
      days,
    });

    toast.success("Workout plan saved successfully");

    // Navigate back to plans page
    router.push("/plans");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Create Workout Plan</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Plan Details</CardTitle>
                <CardDescription>
                  Create your weekly workout split
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  Plan your workouts for each day of the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                    >
                      <div className="font-medium">{day.name}</div>
                      <div className="md:col-span-3">
                        <Input
                          placeholder={`Workout for ${day.name} (leave empty for rest day)`}
                          value={day.workout}
                          onChange={(e) =>
                            updateDayWorkout(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/plans">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Plan
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
