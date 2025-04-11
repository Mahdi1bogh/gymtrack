import { Dumbbell, Utensils, LineChart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentWorkouts from "@/components/recent-workouts";
import NutritionSummary from "@/components/nutrition-summary";
import WeightChart from "@/components/weight-chart";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12">
            {/* Quick Actions - Now more compact */}
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/workouts/new">
                    <Button className="w-full h-9" variant="outline" size="sm">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Log Workout
                    </Button>
                  </Link>
                  <Link href="/nutrition/new">
                    <Button className="w-full h-9" variant="outline" size="sm">
                      <Utensils className="mr-2 h-4 w-4" />
                      Log Meal
                    </Button>
                  </Link>
                  <Link href="/metrics/new">
                    <Button className="w-full h-9" variant="outline" size="sm">
                      <LineChart className="mr-2 h-4 w-4" />
                      Log Weight
                    </Button>
                  </Link>
                  <Link href="/plans">
                    <Button className="w-full h-9" variant="outline" size="sm">
                      <Dumbbell className="mr-2 h-4 w-4" />
                      View Plans
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Today's Nutrition - Now in the top row */}
            <Card className="md:col-span-4 lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle>Todays Nutrition</CardTitle>
                <CardDescription>Calories and macros</CardDescription>
              </CardHeader>
              <CardContent>
                <NutritionSummary />
              </CardContent>
            </Card>

            {/* Weight Progress - Now in the top row */}
            <Card className="md:col-span-6 lg:col-span-6">
              <CardHeader className="pb-2">
                <CardTitle>Weight Progress</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <WeightChart />
              </CardContent>
            </Card>

            {/* Recent Workouts - Now full width in second row */}
            <Card className="md:col-span-6 lg:col-span-12">
              <CardHeader className="pb-2">
                <CardTitle>Recent Workouts</CardTitle>
                <CardDescription>Your last 5 workout sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentWorkouts />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
