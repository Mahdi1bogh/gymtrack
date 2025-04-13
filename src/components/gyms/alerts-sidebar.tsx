"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { alertsData } from "@/lib/sample-data";
import { AlertTriangle, Bell } from "lucide-react";
import { toast } from "sonner";

export function AlertsSidebar() {
  const handleAction = (action: string, message: string) => {
    toast("Action Triggered", {
      description: `${action}: ${message}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alerts
        </CardTitle>
        <CardDescription>Recent notifications and warnings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alertsData.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start justify-between gap-4 rounded-lg border p-4"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <p className="text-sm">{alert.message}</p>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleAction(alert.action, alert.message)}
              >
                {alert.action}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
