"use client";

import {
  Bell,
  Search,
  Home,
  BarChart2,
  Users,
  Calendar,
  Settings,
  Dumbbell,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    // <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
    <div className="flex h-screen  text-white">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-6 border-r border-gray-800/50 backdrop-blur-sm">
        <div className="mb-10">
          <div className="relative">
            <Dumbbell className="h-6 w-6 text-green-500 animate-pulse-ring" />
            <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-sm"></div>
          </div>
        </div>
        <nav className="flex flex-col items-center gap-8">
          <Link href="/profile">
            <button
              className={`p-2 rounded-lg transition-all duration-300 ${
                pathname === "/profile"
                  ? "bg-gradient active-gradient text-green-500 shadow-lg shadow-green-500/20"
                  : "text-gray-500 hover:text-white hover:bg-gradient hover-gradient"
              }`}
            >
              <Home className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/profile/metrics">
            <button
              className={`p-2 rounded-lg transition-all duration-300 ${
                pathname === "/profile/metrics"
                  ? "bg-gradient active-gradient text-green-500 shadow-lg shadow-green-500/20"
                  : "text-gray-500 hover:text-white hover:bg-gradient hover-gradient"
              }`}
            >
              <BarChart2 className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/profile/workouts">
            <button
              className={`p-2 rounded-lg transition-all duration-300 ${
                pathname === "/profile/workouts"
                  ? "bg-gradient active-gradient text-green-500 shadow-lg shadow-green-500/20"
                  : "text-gray-500 hover:text-white hover:bg-gradient hover-gradient"
              }`}
            >
              <Users className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/profile/plans">
            <button
              className={`p-2 rounded-lg transition-all duration-300 ${
                pathname === "/profile/plans"
                  ? "bg-gradient active-gradient text-green-500 shadow-lg shadow-green-500/20"
                  : "text-gray-500 hover:text-white hover:bg-gradient hover-gradient"
              }`}
            >
              <Calendar className="h-5 w-5" />
            </button>
          </Link>
          <Link href="/profile/nutrition">
            <button
              className={`p-2 rounded-lg transition-all duration-300 ${
                pathname === "/profile/nutrition"
                  ? "bg-gradient active-gradient text-green-500 shadow-lg shadow-green-500/20"
                  : "text-gray-500 hover:text-white hover:bg-gradient hover-gradient"
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center p-6 border-b border-gray-800/50 backdrop-blur-sm">
          <div>
            <p className="text-gray-400 text-sm">Good Morning</p>
            <h1 className="text-xl font-semibold text-gradient">
              Welcome Back
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search"
                className="dark:bg-gray-800/50 text-accent-foreground rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-green-500 backdrop-blur-sm border border-gray-800/50"
              />
            </div>
            <ThemeToggle />
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-400 hover:text-green-500 transition-colors" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <div className="flex items-center gap-2 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-800/50 backdrop-blur-sm">
              <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-green-500/20">
                <Image
                  src="/pdp.PNG"
                  alt="Mahdi Boughanmi"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-accent-foreground font-medium">
                Boughanmi Mahdi
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
