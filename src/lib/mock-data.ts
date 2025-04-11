import { subDays, format } from "date-fns"
import type { WorkoutSession, WeightEntry, NutritionDay, Meal, WorkoutPlan } from "./types"

// Generate mock workout data
export function getMockWorkouts(count: number): WorkoutSession[] {
  const workouts: WorkoutSession[] = []

  const workoutTypes = ["Strength", "Cardio", "Flexibility", "HIIT"]
  const workoutNames = [
    "Upper Body",
    "Lower Body",
    "Push Day",
    "Pull Day",
    "Leg Day",
    "Full Body",
    "Core Workout",
    "Cardio Session",
    "Mobility Work",
  ]

  for (let i = 0; i < count; i++) {
    const exerciseCount = Math.floor(Math.random() * 5) + 3 // 3-7 exercises
    const exercises = []
    let totalSets = 0
    let totalReps = 0

    for (let j = 0; j < exerciseCount; j++) {
      const setCount = Math.floor(Math.random() * 3) + 2 // 2-4 sets
      const sets = []

      for (let k = 0; k < setCount; k++) {
        const weight = (Math.floor(Math.random() * 80) + 20).toString() // 20-100kg
        const reps = (Math.floor(Math.random() * 12) + 5).toString() // 5-16 reps
        sets.push({ weight, reps })
        totalReps += Number.parseInt(reps)
      }

      totalSets += setCount

      exercises.push({
        id: `ex-${i}-${j}`,
        name: `Exercise ${j + 1}`,
        sets,
      })
    }

    workouts.push({
      id: `workout-${i}`,
      name: workoutNames[Math.floor(Math.random() * workoutNames.length)],
      type: workoutTypes[Math.floor(Math.random() * workoutTypes.length)],
      date: format(subDays(new Date(), i), "yyyy-MM-dd'T'HH:mm:ss"),
      duration: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
      exercises,
      totalSets,
      totalReps,
    })
  }

  return workouts
}

// Generate mock weight data
export function getMockWeightData(days: number): WeightEntry[] {
  const data: WeightEntry[] = []
  const startWeight = 75 + Math.random() * 10 // Random starting weight between 75-85kg

  for (let i = days; i >= 0; i--) {
    // Skip some days to make it more realistic
    if (i % 3 !== 0 && i !== 0 && i !== days) continue

    // Small random fluctuations with a slight downward trend
    const fluctuation = (Math.random() - 0.5) * 0.8
    const trend = i * 0.01 // Slight downward trend
    const weight = startWeight - trend + fluctuation

    data.push({
      date: format(subDays(new Date(), i), "yyyy-MM-dd"),
      weight: Number.parseFloat(weight.toFixed(1)),
    })
  }

  return data
}

// Generate mock nutrition data
export function getMockNutritionDay(): NutritionDay {
  return {
    date: format(new Date(), "yyyy-MM-dd"),
    caloriesConsumed: Math.floor(Math.random() * 500) + 1800, // 1800-2300 calories
    calorieGoal: 2500,
    proteinConsumed: Math.floor(Math.random() * 30) + 120, // 120-150g protein
    proteinGoal: 180,
    carbsConsumed: Math.floor(Math.random() * 50) + 180, // 180-230g carbs
    carbsGoal: 250,
    fatConsumed: Math.floor(Math.random() * 20) + 50, // 50-70g fat
    fatGoal: 80,
  }
}

// Generate mock meal data
export function getMockMeals(count: number, period: "today" | "yesterday" | "week"): Meal[] {
  const meals: Meal[] = []
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"]
  const mealNames = [
    "Oatmeal with Berries",
    "Protein Smoothie",
    "Chicken Salad",
    "Salmon with Vegetables",
    "Steak and Sweet Potato",
    "Protein Bar",
    "Greek Yogurt with Honey",
    "Turkey Sandwich",
    "Pasta with Meatballs",
  ]

  let dayOffset = 0
  switch (period) {
    case "today":
      dayOffset = 0
      break
    case "yesterday":
      dayOffset = 1
      break
    case "week":
      // For week, we'll spread meals across the last 7 days
      break
  }

  for (let i = 0; i < count; i++) {
    // For week period, spread across days
    const currentOffset = period === "week" ? Math.floor(Math.random() * 7) : dayOffset

    // Create a date with random hour for the meal
    const date = new Date()
    date.setDate(date.getDate() - currentOffset)
    date.setHours(Math.floor(Math.random() * 12) + 7) // Between 7am and 7pm

    meals.push({
      id: `meal-${i}`,
      name: mealNames[Math.floor(Math.random() * mealNames.length)],
      type: mealTypes[Math.floor(Math.random() * mealTypes.length)],
      date: date.toISOString(),
      calories: Math.floor(Math.random() * 400) + 300, // 300-700 calories
      protein: Math.floor(Math.random() * 20) + 20, // 20-40g protein
      carbs: Math.floor(Math.random() * 30) + 30, // 30-60g carbs
      fat: Math.floor(Math.random() * 15) + 10, // 10-25g fat
    })
  }

  return meals
}

// Generate mock workout plans
export function getMockWorkoutPlans(): WorkoutPlan[] {
  return [
    {
      id: "plan-1",
      name: "Push/Pull/Legs Split",
      description: "A 6-day split focusing on pushing, pulling, and leg movements",
      days: [
        { name: "Monday", workout: "Push (Chest, Shoulders, Triceps)" },
        { name: "Tuesday", workout: "Pull (Back, Biceps)" },
        { name: "Wednesday", workout: "Legs (Quads, Hamstrings, Calves)" },
        { name: "Thursday", workout: "Push (Chest, Shoulders, Triceps)" },
        { name: "Friday", workout: "Pull (Back, Biceps)" },
        { name: "Saturday", workout: "Legs (Quads, Hamstrings, Calves)" },
        { name: "Sunday", workout: null },
      ],
    },
    {
      id: "plan-2",
      name: "Upper/Lower Split",
      description: "A 4-day split alternating between upper and lower body",
      days: [
        { name: "Monday", workout: "Upper Body" },
        { name: "Tuesday", workout: "Lower Body" },
        { name: "Wednesday", workout: null },
        { name: "Thursday", workout: "Upper Body" },
        { name: "Friday", workout: "Lower Body" },
        { name: "Saturday", workout: null },
        { name: "Sunday", workout: null },
      ],
    },
  ]
}
