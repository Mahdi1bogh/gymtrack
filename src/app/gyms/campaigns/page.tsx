"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Target, Users, Percent, Calendar } from "lucide-react";
import { toast } from "sonner";

const campaignsData = [
  {
    id: "1",
    name: "Summer Fitness Challenge",
    status: "active",
    type: "Challenge",
    target: "All Members",
    progress: 65,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
  },
  {
    id: "2",
    name: "Ramadan Special Offer",
    status: "scheduled",
    type: "Discount",
    target: "New Members",
    progress: 0,
    startDate: "2024-03-10",
    endDate: "2024-04-10",
  },
  {
    id: "3",
    name: "Bring a Friend Week",
    status: "ended",
    type: "Referral",
    target: "Existing Members",
    progress: 100,
    startDate: "2024-02-01",
    endDate: "2024-02-07",
  },
];

const statusColors = {
  active:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  ended: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function CampaignsPage() {
  const [campaignType, setCampaignType] = useState("challenge");

  const handleCreateCampaign = () => {
    toast("Create Campaign", {
      description: "Opening campaign creation wizard...",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
        <Button onClick={handleCreateCampaign}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Total Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Percent className="h-5 w-5" />
              Avg. Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" />
              Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Campaign List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="challenge">Challenge</SelectItem>
                <SelectItem value="discount">Discount</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search campaigns..." className="max-w-sm" />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignsData.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        statusColors[
                          campaign.status as keyof typeof statusColors
                        ]
                      }
                    >
                      {campaign.status.charAt(0).toUpperCase() +
                        campaign.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.type}</TableCell>
                  <TableCell>{campaign.target}</TableCell>
                  <TableCell>
                    <div className="w-[100px]">
                      <Progress value={campaign.progress} className="h-2" />
                      <span className="text-sm text-muted-foreground">
                        {campaign.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {campaign.startDate} - {campaign.endDate}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
