"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Filters } from "@/components/marketplace/filters";
import { FilterState } from "@/components/marketplace/filters";

export function MarketplaceSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL parameters
  const filters: FilterState = {
    category: searchParams.get("category") || null,
    subcategory: searchParams.get("subcategory") || null,
    type: searchParams.get("type") || null,
    priceRange: [
      Number(searchParams.get("minPrice") || 0),
      Number(searchParams.get("maxPrice") || 1000),
    ],
    rating: Number(searchParams.get("rating") || 0),
    inStock: searchParams.get("inStock") === "true",
    sortBy: (searchParams.get("sortBy") as FilterState["sortBy"]) || "rating",
  };

  const handleFilterChange = (newFilters: FilterState) => {
    // Create new URLSearchParams object
    const params = new URLSearchParams();

    // Add non-null and non-default values to URL
    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.subcategory)
      params.set("subcategory", newFilters.subcategory);
    if (newFilters.type) params.set("type", newFilters.type);
    if (newFilters.priceRange[0] > 0)
      params.set("minPrice", newFilters.priceRange[0].toString());
    if (newFilters.priceRange[1] < 1000)
      params.set("maxPrice", newFilters.priceRange[1].toString());
    if (newFilters.rating > 0)
      params.set("rating", newFilters.rating.toString());
    if (newFilters.inStock) params.set("inStock", "true");
    if (newFilters.sortBy !== "rating") params.set("sortBy", newFilters.sortBy);

    // Update URL with new parameters
    router.push(`/marketplace?${params.toString()}`);
  };

  return (
    <aside className="w-64 border-r border-border bg-card/50 p-6 hidden lg:block">
      <div className="space-y-6">
        <Link href="/marketplace" className="flex items-center space-x-2">
          <span className="text-xl font-bold">FitMarket</span>
        </Link>
        <Separator />
        <Filters filters={filters} onChange={handleFilterChange} />
      </div>
    </aside>
  );
}
