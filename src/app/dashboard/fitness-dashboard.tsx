/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bell,
  Search,
  Home,
  BarChart2,
  Users,
  Calendar,
  Settings,
  ChevronRight,
  ChevronDown,
  Dumbbell,
} from "lucide-react";
import ActivityChart from "./activity-chart";
import ProgressCircle from "./progress-circle";
import HeartRateChart from "./heart-rate-chart";

export default function FitnessDashboard() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "monthly"
  );

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-6 border-r border-gray-800">
        <div className="mb-10">
          <Dumbbell className="h-6 w-6 text-white" />
        </div>
        <nav className="flex flex-col items-center gap-8">
          <button className="p-2 rounded-lg bg-green-500/10 text-green-500">
            <Home className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg text-gray-500 hover:text-white transition-colors">
            <BarChart2 className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg text-gray-500 hover:text-white transition-colors">
            <Users className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg text-gray-500 hover:text-white transition-colors">
            <Calendar className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg text-gray-500 hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div>
            <p className="text-gray-400 text-sm">Good Morning</p>
            <h1 className="text-xl font-semibold">Welcome Back</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Smith Adam"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-sm">Smith Adam</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Section */}
          <div className="col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Activity</h2>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Monthly</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <ActivityChart />
          </div>

          {/* Overview Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Overview</h2>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Monthly</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-center mb-4">
                <ProgressCircle percentage={84} size={150} strokeWidth={10} />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-sm text-gray-400">
                        Calories burn
                      </span>
                    </div>
                    <span className="text-sm text-green-500">+1.31%</span>
                  </div>
                  <p className="text-lg font-semibold">33.5%</p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-sm text-gray-400">Protein</span>
                    </div>
                    <span className="text-sm text-green-500">+2.43%</span>
                  </div>
                  <p className="text-lg font-semibold">23.02%</p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="text-sm text-gray-400">Carbs</span>
                    </div>
                    <span className="text-sm text-green-500">+2.12%</span>
                  </div>
                  <p className="text-lg font-semibold">11.24%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fitness Goal Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Fitness goal</h2>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Monthly</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-4 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-semibold">Side planks</h3>
                  <p className="text-sm text-gray-300">12 sets/day</p>
                  <div className="mt-2">
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Side planks"
                    width={80}
                    height={80}
                    className="opacity-80"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-4 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-semibold">Rope lifting</h3>
                  <p className="text-sm text-gray-300">10 sets/day</p>
                  <div className="mt-2">
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Rope lifting"
                    width={80}
                    height={80}
                    className="opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Heart Rate Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Heart rate</h2>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Weekly</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 h-[220px]">
              <HeartRateChart />
            </div>
          </div>

          {/* Trainer Section */}
          <div className="col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Trainer</h2>
              <button className="text-sm text-gray-400 flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl p-4 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-semibold">John Arnold</h3>
                  <p className="text-sm text-gray-300">Yoga expert</p>
                </div>
                <div className="absolute bottom-0 right-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="John Arnold"
                    width={100}
                    height={100}
                    className="opacity-80"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-4 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-semibold">Adam Smith</h3>
                  <p className="text-sm text-gray-300">Fitness expert</p>
                </div>
                <div className="absolute bottom-0 right-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Adam Smith"
                    width={100}
                    height={100}
                    className="opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommend Activity Section */}
          <div className="col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recommend activity</h2>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Monthly</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Dumbbell className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Fitness for beginners</h3>
                    <p className="text-xs text-gray-400">
                      17 Feb, 2023 at 5:30 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Trainer"
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-400">Toren Twin</span>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Dumbbell className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Beginner to advance gym</h3>
                    <p className="text-xs text-gray-400">
                      17 Feb, 2023 at 4:30 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Trainer"
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-400">Ardin Swen</span>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center">
                    <Dumbbell className="h-4 w-4 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Ultimate body workout</h3>
                    <p className="text-xs text-gray-400">
                      17 Feb, 2023 at 3:30 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Trainer"
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-400">Adam Smith</span>
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Output</h2>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Monthly</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Celery loss</p>
                  <p className="text-xl font-semibold">123 gm</p>
                </div>
                <div className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded">
                  WOW
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Weight loss</p>
                  <p className="text-xl font-semibold">1.23 kg</p>
                </div>
                <div className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded">
                  Great
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Food Section */}
          <div className="col-span-1 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recommended food</h2>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Monthly</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-900 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2">Day one</p>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Veggie and hummus</h3>
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Food"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400">7 days</p>
                <p className="text-xs text-gray-400">early dinner time</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2">Day two</p>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">A bowl of salad</h3>
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-500 text-xs">✓</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">12 days</p>
                <p className="text-xs text-gray-400">early lunch time</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2">Day three</p>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Green variety foods</h3>
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Food"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400">13 days</p>
                <p className="text-xs text-gray-400">breakfast</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-2">Day four</p>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">A bowl of berries</h3>
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Food"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400">9 days</p>
                <p className="text-xs text-gray-400">for breakfast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
