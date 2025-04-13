"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 relative overflow-hidden bg-card hover:bg-accent/80 transition-colors border-border/50 shadow-sm"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-primary transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-primary transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-card border-border/50 shadow-md"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "cursor-pointer transition-colors",
            theme === "light"
              ? "bg-accent/80 text-accent-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Sun className="mr-2 h-4 w-4 text-primary" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "cursor-pointer transition-colors",
            theme === "dark"
              ? "bg-accent/80 text-accent-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Moon className="mr-2 h-4 w-4 text-primary" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "cursor-pointer transition-colors",
            theme === "system"
              ? "bg-accent/80 text-accent-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 text-primary"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
