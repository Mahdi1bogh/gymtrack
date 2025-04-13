"use client";

import { useState } from "react";
import { Filter as FilterIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categories } from "@/lib/marketplace-data";

type SortByValue = "price-asc" | "price-desc" | "rating" | "newest";

export type FilterState = {
  category: string | null;
  subcategory: string | null;
  type: string | null;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  sortBy: SortByValue;
};

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function Filters({ filters, onChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCategory = categories.find((c) => c.name === filters.category);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <>
      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-6 pr-6 py-4">
                <MobileFilters filters={filters} onChange={onChange} />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Category</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className={`w-full justify-start ${
                  filters.category === category.name
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() =>
                  updateFilter(
                    "category",
                    filters.category === category.name ? null : category.name
                  )
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {selectedCategory && (
          <>
            <div>
              <h3 className="font-semibold mb-4">Subcategory</h3>
              <div className="space-y-3">
                {selectedCategory.subcategories.map((sub) => (
                  <Button
                    key={sub.name}
                    variant="ghost"
                    className={`w-full justify-start ${
                      filters.subcategory === sub.name
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }`}
                    onClick={() =>
                      updateFilter(
                        "subcategory",
                        filters.subcategory === sub.name ? null : sub.name
                      )
                    }
                  >
                    {sub.name}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />
          </>
        )}

        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="px-2">
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={(value: number[]) =>
                updateFilter("priceRange", [value[0], value[1]] as [
                  number,
                  number
                ])
              }
              className="my-6"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-4">Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant="ghost"
                className={`w-full justify-start ${
                  filters.rating === rating
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() =>
                  updateFilter("rating", filters.rating === rating ? 0 : rating)
                }
              >
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-primary">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <span key={i} className="text-muted">
                    ★
                  </span>
                ))}
                <span className="ml-2">& Up</span>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-4">Sort By</h3>
          <Select
            value={filters.sortBy}
            onValueChange={(value: SortByValue) =>
              updateFilter("sortBy", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Best Rating</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => updateFilter("inStock", !filters.inStock)}
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border ${
                filters.inStock ? "bg-primary border-primary" : "border-primary"
              }`}
            >
              {filters.inStock && (
                <Check className="h-3 w-3 text-primary-foreground" />
              )}
            </div>
            In Stock Only
          </Button>
        </div>
      </div>
    </>
  );
}

function MobileFilters({ filters, onChange }: FiltersProps) {
  // Mobile version of the filters with the same functionality
  // but optimized for touch and smaller screens
  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <Select
          value={filters.category || ""}
          onValueChange={(value) =>
            onChange({ ...filters, category: value || null })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={(value: number[]) =>
              onChange({
                ...filters,
                priceRange: [value[0], value[1]] as [number, number],
              })
            }
            className="my-6"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold mb-4">Minimum Rating</h3>
        <div className="grid grid-cols-4 gap-2">
          {[4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating === rating ? "default" : "outline"}
              size="sm"
              onClick={() =>
                onChange({
                  ...filters,
                  rating: filters.rating === rating ? 0 : rating,
                })
              }
            >
              {rating}★
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sort By */}
      <div>
        <h3 className="font-semibold mb-4">Sort By</h3>
        <Select
          value={filters.sortBy}
          onValueChange={(value: SortByValue) =>
            onChange({ ...filters, sortBy: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Best Rating</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* In Stock Toggle */}
      <div>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => onChange({ ...filters, inStock: !filters.inStock })}
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded border ${
              filters.inStock ? "bg-primary border-primary" : "border-primary"
            }`}
          >
            {filters.inStock && (
              <Check className="h-3 w-3 text-primary-foreground" />
            )}
          </div>
          In Stock Only
        </Button>
      </div>
    </div>
  );
}
