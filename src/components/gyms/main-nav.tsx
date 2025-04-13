"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dumbbell, Users, Target, BarChart2 } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/gyms", icon: Dumbbell },
  { name: "Members", href: "/gyms/members", icon: Users },
  { name: "Retention", href: "/gyms/retention", icon: BarChart2 },
  { name: "Campaigns", href: "/gyms/campaigns", icon: Target },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.name}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href && "bg-muted"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
