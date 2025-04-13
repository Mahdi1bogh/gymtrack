"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { products } from "@/lib/marketplace-data";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  const filteredProducts = products
    .filter((product) => {
      // Category filter
      const category = searchParams.get("category");
      if (category && product.category !== category) return false;

      // Subcategory filter
      const subcategory = searchParams.get("subcategory");
      if (subcategory && product.subcategory !== subcategory) return false;

      // Type filter
      const type = searchParams.get("type");
      if (type && product.type !== type) return false;

      // Price range filter
      const minPrice = Number(searchParams.get("minPrice") || 0);
      const maxPrice = Number(searchParams.get("maxPrice") || 1000);
      if (product.price < minPrice || product.price > maxPrice) return false;

      // Rating filter
      const rating = Number(searchParams.get("rating") || 0);
      if (rating && product.rating < rating) return false;

      // In stock filter
      const inStock = searchParams.get("inStock") === "true";
      if (inStock && product.stock === 0) return false;

      return true;
    })
    .sort((a, b) => {
      const sortBy = searchParams.get("sortBy") || "rating";
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof products)[0]
  ) => {
    e.preventDefault(); // Prevent navigation
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <main className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/marketplace/product/${product.id}`}>
            <Card className="group h-full hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="aspect-square relative bg-accent/10 rounded-t-xl overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  {product.category} • {product.subcategory}
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star
                      className={`h-4 w-4 mr-1 ${
                        product.rating >= 4
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                    {product.rating} ({product.reviews})
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  disabled={product.stock === 0}
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-lg font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground">
            Try adjusting your filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </main>
  );
}
