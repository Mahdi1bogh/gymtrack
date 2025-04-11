import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WorkoutPlanList from "@/components/workout-plan-list";

export default function PlansPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Workout Plans</h1>
            <Link href="/plans/new">
              <Button>Create New Plan</Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Workout Plans</CardTitle>
              <CardDescription>
                Manage your weekly workout splits and routines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutPlanList />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
