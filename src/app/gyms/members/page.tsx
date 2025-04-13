"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const membersData = [
  {
    id: "1",
    name: "Ahmed Ben Ali",
    status: "active",
    plan: "Premium Annual",
    joinDate: "2023-09-15",
    lastVisit: "2024-03-20",
  },
  {
    id: "2",
    name: "Leila Ben Salah",
    status: "inactive",
    plan: "Monthly",
    joinDate: "2023-11-01",
    lastVisit: "2024-02-20",
  },
  {
    id: "3",
    name: "Karim Gharbi",
    status: "active",
    plan: "Quarterly",
    joinDate: "2024-01-10",
    lastVisit: "2024-03-19",
  },
  {
    id: "4",
    name: "Sarra Mejri",
    status: "pending",
    plan: "Monthly",
    joinDate: "2024-03-18",
    lastVisit: "2024-03-18",
  },
  {
    id: "5",
    name: "Yassine Touati",
    status: "active",
    plan: "Premium Annual",
    joinDate: "2023-08-22",
    lastVisit: "2024-03-21",
  },
];

const statusColors = {
  active:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    toast("Exporting Members", {
      description: "Your export will be ready for download shortly.",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Members</h1>
        <Button onClick={() => toast("Coming soon!")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary" onClick={handleExport}>
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Member List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Join Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/gyms/members/${member.id}`}
                      className="hover:underline"
                    >
                      {member.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        statusColors[member.status as keyof typeof statusColors]
                      }
                    >
                      {member.status.charAt(0).toUpperCase() +
                        member.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>{member.lastVisit}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/gyms/members/${member.id}`}>
                        View Profile
                      </Link>
                    </Button>
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
