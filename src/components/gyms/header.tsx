import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle language</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
