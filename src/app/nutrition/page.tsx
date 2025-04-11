import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MealList from "@/components/meal-list";
import NutritionOverview from "@/components/nutrition-overview";

export default function NutritionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Nutrition</h1>
            <Link href="/nutrition/new">
              <Button>Log New Meal</Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Nutrition Overview</CardTitle>
                <CardDescription>Your daily nutrition summary</CardDescription>
              </CardHeader>
              <CardContent>
                <NutritionOverview />
              </CardContent>
            </Card>

            <div className="md:col-span-3">
              <Tabs defaultValue="today">
                <TabsList className="mb-4">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                </TabsList>
                <TabsContent value="today">
                  <Card>
                    <CardHeader>
                      <CardTitle>Todays Meals</CardTitle>
                      <CardDescription>Meals logged for today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MealList period="today" />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="yesterday">
                  <Card>
                    <CardHeader>
                      <CardTitle>Yesterdays Meals</CardTitle>
                      <CardDescription>
                        Meals logged for yesterday
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MealList period="yesterday" />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="week">
                  <Card>
                    <CardHeader>
                      <CardTitle>This Weeks Meals</CardTitle>
                      <CardDescription>
                        Meals logged for the past 7 days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MealList period="week" />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
