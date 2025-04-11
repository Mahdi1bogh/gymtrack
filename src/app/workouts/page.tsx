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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Workouts</h1>
            <Link href="/workouts/new">
              <Button>Log New Workout</Button>
            </Link>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Workouts</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Workouts</CardTitle>
                  <CardDescription>
                    View all your workout sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WorkoutList filter="all" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="strength">
              <Card>
                <CardHeader>
                  <CardTitle>Strength Workouts</CardTitle>
                  <CardDescription>
                    View your strength training sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WorkoutList filter="strength" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cardio">
              <Card>
                <CardHeader>
                  <CardTitle>Cardio Workouts</CardTitle>
                  <CardDescription>View your cardio sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <WorkoutList filter="cardio" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="flexibility">
              <Card>
                <CardHeader>
                  <CardTitle>Flexibility Workouts</CardTitle>
                  <CardDescription>
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
      </main>
    </div>
  );
}
