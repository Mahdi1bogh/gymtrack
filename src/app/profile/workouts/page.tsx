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
import WorkoutList from "@/components/workout-list";

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gradient">Workouts</h2>
          <p className="text-sm text-gray-400">
            Track and manage your workout sessions
          </p>
        </div>
        <Link href="/workouts/new">
          <Button className="bg-gradient hover-gradient text-white shadow-lg shadow-green-500/20">
            Log New Workout
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-gray-800/50 backdrop-blur-sm border border-gray-800/50">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-gradient data-[state=active]:text-green-500 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20"
          >
            All Workouts
          </TabsTrigger>
          <TabsTrigger
            value="strength"
            className="data-[state=active]:bg-gradient data-[state=active]:text-green-500 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20"
          >
            Strength
          </TabsTrigger>
          <TabsTrigger
            value="cardio"
            className="data-[state=active]:bg-gradient data-[state=active]:text-green-500 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20"
          >
            Cardio
          </TabsTrigger>
          <TabsTrigger
            value="flexibility"
            className="data-[state=active]:bg-gradient data-[state=active]:text-green-500 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20"
          >
            Flexibility
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gradient">All Workouts</CardTitle>
              <CardDescription className="text-gray-400">
                View all your workout sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutList filter="all" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="strength">
          <Card className="border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gradient">Strength Workouts</CardTitle>
              <CardDescription className="text-gray-400">
                View your strength training sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutList filter="strength" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cardio">
          <Card className="border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gradient">Cardio Workouts</CardTitle>
              <CardDescription className="text-gray-400">
                View your cardio sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutList filter="cardio" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flexibility">
          <Card className="border-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gradient">
                Flexibility Workouts
              </CardTitle>
              <CardDescription className="text-gray-400">
                View your flexibility and mobility sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutList filter="flexibility" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
