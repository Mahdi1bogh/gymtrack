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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Body Metrics</h1>
            <Link href="/metrics/new">
              <Button>Log New Measurement</Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
                <CardDescription>Track your weight over time</CardDescription>
              </CardHeader>
              <CardContent>
                <WeightTracker />
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Log Todays Metrics</CardTitle>
                <CardDescription>
                  Quick entry for todays measurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BodyMetricsForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
