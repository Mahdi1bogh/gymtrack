"use client";

import { MarketplaceNavbar } from "@/components/marketplace/navbar";
import { MarketplaceSidebar } from "@/components/marketplace/marketplace-sidebar";
import { CartProvider } from "@/context/cart-context";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="flex min-h-screen bg-background">
        <MarketplaceSidebar />
        <div className="flex-1 flex flex-col">
          <MarketplaceNavbar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </CartProvider>
  );
}
