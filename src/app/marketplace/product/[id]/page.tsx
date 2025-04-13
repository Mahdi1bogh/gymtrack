"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, Truck, Shield, ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/lib/marketplace-data";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-8 gap-2"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border border-border bg-accent/10">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-md border bg-accent/10 cursor-pointer hover:border-primary transition-colors"
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                by {product.seller.name}
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.type} className="space-y-2">
              <label className="text-sm font-medium">{variant.type}</label>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => (
                  <Button
                    key={option}
                    variant={
                      selectedVariants[variant.type] === option
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setSelectedVariants({
                        ...selectedVariants,
                        [variant.type]: option,
                      })
                    }
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button className="w-full" size="lg">
            Add to Cart
          </Button>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4" />
                  Free Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription>
                  On orders over $50. Delivery in 2-5 business days.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4" />
                  Money Back
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription>
                  30-day money-back guarantee if you&apos;re not satisfied.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="features" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specs" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
