"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  MapIcon as WhatsappIcon,
  Tag,
  Calendar as CalendarIcon,
  Edit2,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MemberData {
  id: string;
  name: string;
  tier: string;
  joinDate: string;
  lastVisit: string;
  checkIns: Date[];
  tags: string[];
  notes: string;
  phone: string;
}

export default function MemberClient({
  memberData,
}: {
  memberData: MemberData;
}) {
  const [notes, setNotes] = useState(memberData.notes);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveNotes = () => {
    setIsEditing(false);
    toast("Notes Updated", {
      description: "Member notes have been saved successfully.",
    });
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${memberData.phone.replace(/\D/g, "")}`,
      "_blank"
    );
    toast("WhatsApp Message", {
      description: "Opening WhatsApp with member contact...",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{memberData.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <Badge variant="secondary">{memberData.tier}</Badge>
            <span className="text-sm text-muted-foreground">
              Joined {new Date(memberData.joinDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleWhatsApp}>
            <WhatsappIcon className="mr-2 h-4 w-4" />
            Send Message
          </Button>
          <Button variant="secondary">
            <Phone className="mr-2 h-4 w-4" />
            {memberData.phone}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Check-in History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={memberData.checkIns}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Notes & Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              {memberData.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="relative">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[150px]"
                disabled={!isEditing}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-2"
                onClick={() =>
                  isEditing ? handleSaveNotes() : setIsEditing(true)
                }
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
