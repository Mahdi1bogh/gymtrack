import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./theme-toggle";

// Placeholder icons

export const Header = () => {
  return (
    <header className="w-full flex justify-center items-center border-b">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold">FitTrack</h1>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="/workouts"
            className="text-sm font-medium hover:underline"
          >
            Workouts
          </Link>
          <Link
            href="/nutrition"
            className="text-sm font-medium hover:underline"
          >
            Nutrition
          </Link>
          <Link href="/metrics" className="text-sm font-medium hover:underline">
            Metrics
          </Link>
          <Link href="/plans" className="text-sm font-medium hover:underline">
            Plans
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
