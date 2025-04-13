"use client";

import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartSheet } from "@/components/marketplace/cart-sheet";

export function MarketplaceNavbar() {
  return (
    <header className="border-b border-border bg-background">
      <div className="flex h-14 items-center px-6">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full bg-background/95 h-9 pl-9 pr-4 text-sm rounded-md border border-border"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <CartSheet />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
