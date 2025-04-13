import { AlertsSidebar } from "@/components/gyms/alerts-sidebar";
import { Header } from "@/components/gyms/header";
import { PeakHoursHeatmap } from "@/components/gyms/peak-hours-heatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Activity, TrendingUp, Users, DollarSign } from "lucide-react";

const stats = [
  {
    name: "Active Members",
    value: "2,345",
    icon: Users,
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "New Sign-ups",
    value: "145",
    icon: TrendingUp,
    change: "+12.5%",
    changeType: "positive",
  },
  {
    name: "Retention Rate",
    value: "85%",
    icon: Activity,
    change: "-2.3%",
    changeType: "negative",
  },
  {
    name: "Revenue (TND)",
    value: "32,450",
    icon: DollarSign,
    change: "+8.2%",
    changeType: "positive",
  },
];

export default function Home() {
  return (
    <div className="flex-1">
      <Header />
      <main className="p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.name}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p
                    className={`text-xs ${
                      stat.changeType === "positive"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <PeakHoursHeatmap />
          <AlertsSidebar />
        </div>
      </main>
    </div>
  );
}
