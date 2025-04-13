"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Mail, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const retentionData = [
  { month: "Jan", rate: 72 },
  { month: "Feb", rate: 68 },
  { month: "Mar", rate: 75 },
  { month: "Apr", rate: 82 },
  { month: "May", rate: 79 },
  { month: "Jun", rate: 85 },
];

const atRiskMembers = [
  {
    id: 1,
    name: "Sami Trabelsi",
    lastVisit: "2024-02-15",
    plan: "Premium Annual",
    riskLevel: "High",
  },
  {
    id: 2,
    name: "Leila Ben Salah",
    lastVisit: "2024-02-20",
    plan: "Monthly",
    riskLevel: "Medium",
  },
  {
    id: 3,
    name: "Karim Gharbi",
    lastVisit: "2024-02-25",
    plan: "Quarterly",
    riskLevel: "High",
  },
];

export default function RetentionPage() {
  const handleEmailTemplate = (template: string) => {
    toast("Email Template Selected", {
      description: `Preparing to send "${template}" template to at-risk members.`,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleContactMember = (memberId: number) => {
    toast("Contact Member", {
      description: "Opening communication panel...",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Member Retention</h1>
        <div className="flex items-center gap-4">
          <Select onValueChange={handleEmailTemplate}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select email template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reactivation">Reactivation Offer</SelectItem>
              <SelectItem value="feedback">Feedback Request</SelectItem>
              <SelectItem value="wellness">Wellness Check-in</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Send to All
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              At-Risk Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atRiskMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.lastVisit}</TableCell>
                    <TableCell>{member.plan}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleContactMember(member.id)}
                      >
                        Contact
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
