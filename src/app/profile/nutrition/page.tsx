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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gradient">Nutrition</h2>
          <p className="text-sm text-gray-400">
            Track and manage your daily nutrition
          </p>
        </div>
        <Link href="/nutrition/new">
          <Button className="bg-gradient hover-gradient text-white shadow-lg shadow-green-500/20">
            Log New Meal
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3 border-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Nutrition Overview</CardTitle>
            <CardDescription className="text-gray-400">
              Your daily nutrition summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NutritionOverview />
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="today" className="space-y-4">
            <TabsList className="bg-gray-800/50 backdrop-blur-sm border border-gray-800/50">
              <TabsTrigger
                value="today"
                className="data-[state=active]:bg-gradient data-[state=active]:text-green-500 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20"
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="yesterday"
                className="data-[state=active]:bg-gradient data-[state=active]:text-green-500 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20"
              >
                Yesterday
              </TabsTrigger>
              <TabsTrigger
                value="week"
                className="data-[state=active]:bg-gradient data-[state=active]:text-green-500 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20"
              >
                This Week
              </TabsTrigger>
            </TabsList>
            <TabsContent value="today">
              <Card className=" border-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gradient">Todays Meals</CardTitle>
                  <CardDescription className="text-gray-400">
                    Meals logged for today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MealList period="today" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="yesterday">
              <Card className=" border-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gradient">
                    Yesterdays Meals
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Meals logged for yesterday
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MealList period="yesterday" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="week">
              <Card className=" border-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gradient">
                    This Weeks Meals
                  </CardTitle>
                  <CardDescription className="text-gray-400">
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
  );
}
