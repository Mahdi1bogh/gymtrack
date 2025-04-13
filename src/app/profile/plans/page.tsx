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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gradient">Workout Plans</h2>
          <p className="text-sm text-gray-400">
            Create and manage your workout routines
          </p>
        </div>
        <Link href="/plans/new">
          <Button className="bg-gradient hover-gradient text-white shadow-lg shadow-green-500/20">
            Create New Plan
          </Button>
        </Link>
      </div>

      <Card className=" border-gray-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-gradient">Your Workout Plans</CardTitle>
          <CardDescription className="text-gray-400">
            Manage your weekly workout splits and routines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorkoutPlanList />
        </CardContent>
      </Card>
    </div>
  );
}
