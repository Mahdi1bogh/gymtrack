import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WeightTracker from "@/components/weight-tracker";
import BodyMetricsForm from "@/components/body-metrics";

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gradient">Body Metrics</h2>
          <p className="text-sm text-gray-400">
            Track and monitor your body measurements
          </p>
        </div>
        <Link href="/metrics/new">
          <Button className="bg-gradient hover-gradient text-white shadow-lg shadow-green-500/20">
            Log New Measurement
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3 border-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Weight Progress</CardTitle>
            <CardDescription className="text-gray-400">
              Track your weight over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeightTracker />
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gradient">Log Todays Metrics</CardTitle>
            <CardDescription className="text-gray-400">
              Quick entry for todays measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BodyMetricsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
