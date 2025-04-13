"use client";

import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

export function CartSheet() {
  const { state, removeItem, updateQuantity } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="relative bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
            {state.items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full border-border flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        {state.items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center text-muted-foreground">
              Your cart is empty
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="space-y-4 p-4">
                {state.items.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex gap-4">
                      <div className="aspect-square h-16 relative overflow-hidden rounded-md bg-accent/10">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            {item.variants && (
                              <div className="text-xs text-muted-foreground">
                                {Object.entries(item.variants)
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join(", ")}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${state.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {state.shipping === 0
                      ? "Free"
                      : `$${state.shipping.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
              <SheetFooter className="mt-4">
                <Button className="w-full">Checkout</Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
