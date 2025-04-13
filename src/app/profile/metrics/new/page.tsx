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
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";

export default function NewMetricsPage() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [arms, setArms] = useState("");
  const [thighs, setThighs] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!weight) {
      toast.error("Please enter your weight");
      return;
    }

    // In a real app, this would be an API call to save the metrics
    console.log({
      date,
      weight: Number.parseFloat(weight),
      bodyFat: bodyFat ? Number.parseFloat(bodyFat) : null,
      measurements: {
        chest: chest ? Number.parseFloat(chest) : null,
        waist: waist ? Number.parseFloat(waist) : null,
        hips: hips ? Number.parseFloat(hips) : null,
        arms: arms ? Number.parseFloat(arms) : null,
        thighs: thighs ? Number.parseFloat(thighs) : null,
      },
      notes,
    });

    toast.success("Metrics saved successfully");

    // Navigate back to metrics page
    router.push("/metrics");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold">
            FitTrack
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link
              href="/workouts"
              className="text-sm font-medium hover:underline"
            >
              Workouts
            </Link>
            <Link
              href="/nutrition"
              className="text-sm font-medium hover:underline"
            >
              Nutrition
            </Link>
            <Link href="/metrics" className="text-sm font-medium underline">
              Metrics
            </Link>
            <Link href="/plans" className="text-sm font-medium hover:underline">
              Plans
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Log New Measurements</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Basic Metrics</CardTitle>
                <CardDescription>
                  Enter your weight and body fat percentage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 70.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body-fat">Body Fat % (optional)</Label>
                    <Input
                      id="body-fat"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 15.0"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Body Measurements</CardTitle>
                <CardDescription>
                  Enter your body measurements in centimeters (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chest">Chest (cm)</Label>
                    <Input
                      id="chest"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 100.0"
                      value={chest}
                      onChange={(e) => setChest(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist (cm)</Label>
                    <Input
                      id="waist"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 80.0"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hips">Hips (cm)</Label>
                    <Input
                      id="hips"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 95.0"
                      value={hips}
                      onChange={(e) => setHips(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arms">Arms (cm)</Label>
                    <Input
                      id="arms"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 35.0"
                      value={arms}
                      onChange={(e) => setArms(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thighs">Thighs (cm)</Label>
                    <Input
                      id="thighs"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 55.0"
                      value={thighs}
                      onChange={(e) => setThighs(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>
                  Add any additional notes about your measurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <textarea
                    id="notes"
                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                    placeholder="Any notes about your measurements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/metrics">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Measurements
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
