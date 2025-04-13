"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { daysOfWeek, peakHoursData } from "@/lib/sample-data";

export function PeakHoursHeatmap() {
  const getColor = (value: number) => {
    if (value < 30) return "bg-green-100 dark:bg-green-900/30";
    if (value < 60) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  const getIntensityLabel = (value: number) => {
    if (value < 30) return "Quiet";
    if (value < 60) return "Moderate";
    return "Busy";
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Peak Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div className="space-y-6 pt-8">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-sm">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-24 gap-1">
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className="text-xs text-center -rotate-90 translate-y-8 origin-top"
              >
                {i}:00
              </div>
            ))}
            {peakHoursData.map((cell, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={`h-8 rounded ${getColor(cell.value)}`} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {daysOfWeek[cell.day]} at {cell.hour}:00
                      <br />
                      {getIntensityLabel(cell.value)} ({cell.value}% capacity)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
