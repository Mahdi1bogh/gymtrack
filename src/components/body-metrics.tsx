"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function BodyMetricsForm() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [arms, setArms] = useState("");
  const [thighs, setThighs] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!weight) {
      toast.error("Please enter your weight");
      return;
    }

    // In a real app, this would be an API call to save the metrics
    console.log({
      date: new Date().toISOString(),
      weight: Number.parseFloat(weight),
      bodyFat: bodyFat ? Number.parseFloat(bodyFat) : null,
      measurements: {
        chest: chest ? Number.parseFloat(chest) : null,
        waist: waist ? Number.parseFloat(waist) : null,
        hips: hips ? Number.parseFloat(hips) : null,
        arms: arms ? Number.parseFloat(arms) : null,
        thighs: thighs ? Number.parseFloat(thighs) : null,
      },
    });

    toast.success("Metrics saved successfully");

    // Reset form
    setWeight("");
    setBodyFat("");
    setChest("");
    setWaist("");
    setHips("");
    setArms("");
    setThighs("");

    // Refresh the page to show updated data
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg) *</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            placeholder="e.g., 70.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
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

      <div>
        <h3 className="text-lg font-medium mb-2">Measurements (optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

      <Button type="submit" className="w-full">
        <Save className="mr-2 h-4 w-4" /> Save Todays Metrics
      </Button>
    </form>
  );
}
