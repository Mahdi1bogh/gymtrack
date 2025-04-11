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
import type { FoodItem } from "@/lib/types";
import { toast } from "sonner";

export default function NewMealPage() {
  const router = useRouter();
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealDate, setMealDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [mealTime, setMealTime] = useState(
    new Date().toTimeString().split(" ")[0].substring(0, 5)
  );
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: "1",
      name: "",
      servingSize: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  ]);

  const addFoodItem = () => {
    setFoodItems([
      ...foodItems,
      {
        id: Date.now().toString(),
        name: "",
        // serving: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      },
    ]);
  };

  const removeFoodItem = (itemId: string) => {
    setFoodItems(foodItems.filter((item) => item.id !== itemId));
  };

  const updateFoodItem = (
    itemId: string,
    field: keyof FoodItem,
    value: string
  ) => {
    setFoodItems(
      foodItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const calculateTotals = () => {
    return foodItems.reduce(
      (totals, item) => {
        const calories = Number.parseFloat(item.calories) || 0;
        const protein = Number.parseFloat(item.protein) || 0;
        const carbs = Number.parseFloat(item.carbs) || 0;
        const fat = Number.parseFloat(item.fat) || 0;

        return {
          calories: totals.calories + calories,
          protein: totals.protein + protein,
          carbs: totals.carbs + carbs,
          fat: totals.fat + fat,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!mealName) {
      toast.error("Please enter a meal name");
      return;
    }

    if (!mealType) {
      toast.error("Please select a meal type");
      return;
    }

    // In a real app, this would be an API call to save the meal
    console.log({
      name: mealName,
      type: mealType,
      date: `${mealDate}T${mealTime}`,
      foodItems,
      totals: calculateTotals(),
    });

    toast.success("Meal saved successfully");

    // Navigate back to nutrition page
    router.push("/nutrition");
  };

  const totals = calculateTotals();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Log New Meal</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Meal Details</CardTitle>
                <CardDescription>
                  Enter the details of your meal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meal-name">Meal Name</Label>
                    <Input
                      id="meal-name"
                      placeholder="e.g., Breakfast, Lunch, Dinner, Snack"
                      value={mealName}
                      onChange={(e) => setMealName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meal-type">Meal Type</Label>
                    <Select value={mealType} onValueChange={setMealType}>
                      <SelectTrigger id="meal-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meal-date">Date</Label>
                    <Input
                      id="meal-date"
                      type="date"
                      value={mealDate}
                      onChange={(e) => setMealDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meal-time">Time</Label>
                    <Input
                      id="meal-time"
                      type="time"
                      value={mealTime}
                      onChange={(e) => setMealTime(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Food Items</CardTitle>
                <CardDescription>
                  Add the food items in your meal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {foodItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-2 flex-1 mr-4">
                        <Label htmlFor={`food-${item.id}`}>Food Name</Label>
                        <Input
                          id={`food-${item.id}`}
                          placeholder="e.g., Chicken Breast, Brown Rice, etc."
                          value={item.name}
                          onChange={(e) =>
                            updateFoodItem(item.id, "name", e.target.value)
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFoodItem(item.id)}
                        disabled={foodItems.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor={`serving-${item.id}`}>
                          Serving Size
                        </Label>
                        <Input
                          id={`serving-${item.id}`}
                          placeholder="e.g., 100g, 1 cup, etc."
                          value={item.servingSize}
                          onChange={(e) =>
                            updateFoodItem(
                              item.id,
                              "servingSize",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`calories-${item.id}`}>Calories</Label>
                        <Input
                          id={`calories-${item.id}`}
                          type="number"
                          placeholder="kcal"
                          value={item.calories}
                          onChange={(e) =>
                            updateFoodItem(item.id, "calories", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`protein-${item.id}`}>
                          Protein (g)
                        </Label>
                        <Input
                          id={`protein-${item.id}`}
                          type="number"
                          placeholder="g"
                          value={item.protein}
                          onChange={(e) =>
                            updateFoodItem(item.id, "protein", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`carbs-${item.id}`}>Carbs (g)</Label>
                        <Input
                          id={`carbs-${item.id}`}
                          type="number"
                          placeholder="g"
                          value={item.carbs}
                          onChange={(e) =>
                            updateFoodItem(item.id, "carbs", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`fat-${item.id}`}>Fat (g)</Label>
                        <Input
                          id={`fat-${item.id}`}
                          type="number"
                          placeholder="g"
                          value={item.fat}
                          onChange={(e) =>
                            updateFoodItem(item.id, "fat", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addFoodItem}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Food Item
                </Button>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Meal Summary</CardTitle>
                <CardDescription>
                  Nutritional totals for this meal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Calories</p>
                    <p className="text-2xl font-bold">
                      {totals.calories.toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground">kcal</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Protein</p>
                    <p className="text-2xl font-bold">
                      {totals.protein.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">g</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Carbs</p>
                    <p className="text-2xl font-bold">
                      {totals.carbs.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">g</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Fat</p>
                    <p className="text-2xl font-bold">
                      {totals.fat.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">g</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link href="/nutrition">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Meal
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
