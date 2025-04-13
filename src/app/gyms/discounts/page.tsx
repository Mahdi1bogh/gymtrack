"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function DiscountsPage() {
  const [progress] = useState(50);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Promo Campaign Builder</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount Type</label>
              <Select defaultValue="percentage">
                <SelectTrigger>
                  <SelectValue placeholder="Select discount type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount (TND)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Discount Value</label>
              <Input
                type="number"
                placeholder="Enter value"
                defaultValue={20}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (days)</label>
              <Input
                type="number"
                placeholder="Enter duration"
                defaultValue={30}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Members</label>
              <Select defaultValue="new">
                <SelectTrigger>
                  <SelectValue placeholder="Select target members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Members</SelectItem>
                  <SelectItem value="existing">Existing Members</SelectItem>
                  <SelectItem value="all">All Members</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Redemption Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} />
              <p className="text-center text-sm text-muted-foreground">
                {progress}/100 codes redeemed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
