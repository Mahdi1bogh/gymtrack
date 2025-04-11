export interface Set {
    weight: string
    reps: string
  }
  
  export interface Exercise {
    id: string
    name: string
    sets: Set[]
  }
  
  export interface WorkoutSession {
    id: string
    name: string
    type: string
    date: string
    duration: number
    exercises: Exercise[]
    totalSets: number
    totalReps: number
  }
  
  export interface FoodItem {
    id: string
    name: string
    servingSize?: string
    calories: string
    protein: string
    carbs: string
    fat: string
  }
  
  export interface Meal {
    id: string
    name: string
    type: string
    date: string
    calories: number
    protein: number
    carbs: number
    fat: number
    items?: FoodItem[]
  }
  
  export interface NutritionDay {
    date: string
    caloriesConsumed: number
    calorieGoal: number
    proteinConsumed: number
    proteinGoal: number
    carbsConsumed: number
    carbsGoal: number
    fatConsumed: number
    fatGoal: number
    meals?: Meal[]
  }
  
  export interface WeightEntry {
    date: string
    weight: number
  }
  
  export interface BodyMeasurements {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    thighs?: number
  }
  
  export interface BodyMetrics {
    id: string
    date: string
    weight: number
    bodyFat?: number
    measurements?: BodyMeasurements
  }
  
  export interface PlanDay {
    name: string
    workout: string | null
  }
  
  export interface WorkoutPlan {
    id: string
    name: string
    description: string
    days: PlanDay[]
  }
  