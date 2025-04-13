"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Bell,
  MessageSquare,
  Plus,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-[#2d2d42]">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 border-2 border-purple-500">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>FT</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">FitTrack</h2>
            <p className="text-xs text-gray-400">Fitness & Health</p>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search here..."
              className="bg-[#2d2d42] border-none rounded-full pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-[#2d2d42]"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-[#2d2d42]"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 p-4 border-r border-[#2d2d42] hidden md:block">
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 mb-4">MENU</h3>
            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d42] text-white"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-600">
                  <Search className="h-4 w-4" />
                </div>
                <span>Dashboard</span>
              </Link>
              <Link
                href="/gyms"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d42] text-white"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2d2d42]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M6 8H5a4 4 0 0 0 0 8h1"></path>
                    <path d="M8 6h8"></path>
                    <path d="M8 18h8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                </div>
                <span>Gyms</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d42] text-white"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2d2d42]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span>Profile</span>
              </Link>
              <Link
                href="/marketplace"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d42] text-white"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2d2d42]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <path d="M3 6h18"></path>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <span>Marketplace</span>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-4">
              LIBRARY
            </h3>
            <nav className="space-y-2">
              <Link
                href="/workout-plans"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d42] text-white"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2d2d42]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <span>Workout Plans</span>
              </Link>
              <Link
                href="/nutrition"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d42] text-white"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2d2d42]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.4 11.5 7.6 11.7.2.1.5.1.8 0 .2-.2 7.6-6.3 7.6-11.7a8 8 0 0 0-8-8z"></path>
                    <path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                  </svg>
                </div>
                <span>Nutrition</span>
              </Link>
              <Link
                href="/progress"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2d2d42] text-white"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2d2d42]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                </div>
                <span>Progress</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Featured Trainers */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Featured Trainers</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-400 flex items-center gap-1"
              >
                See All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <Card className="bg-gradient-to-br from-purple-900 to-purple-700 border-none rounded-xl overflow-hidden relative group">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                      alt="Trainer"
                      width={200}
                      height={200}
                      className="object-contain w-full h-full brightness-75 group-hover:brightness-100 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-semibold">@trainer_mike</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900 to-blue-700 border-none rounded-xl overflow-hidden relative group">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src="/https://randomuser.me/api/portraits/thumb/men/80.jpg"
                      alt="Trainer"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full brightness-75 group-hover:brightness-100 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-semibold">@fitness_sarah</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-900 to-red-700 border-none rounded-xl overflow-hidden relative group">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src="/https://randomuser.me/api/portraits/thumb/men/70.jpg"
                      alt="Trainer"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full brightness-75 group-hover:brightness-100 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-semibold">@coach_alex</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900 to-cyan-700 border-none rounded-xl overflow-hidden relative group">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src="https://randomuser.me/api/portraits/thumb/men/72.jpg"
                      alt="Trainer"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full brightness-75 group-hover:brightness-100 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-semibold">@yoga_jen</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900 to-green-700 border-none rounded-xl overflow-hidden relative group">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src="https://randomuser.me/api/portraits/thumb/men/73.jpg"
                      alt="Trainer"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full brightness-75 group-hover:brightness-100 transition-all"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-semibold">@strength_tom</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900 to-orange-700 border-none rounded-xl overflow-hidden relative group">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                      <Plus className="h-8 w-8" />
                    </div>
                    <Image
                      src="https://randomuser.me/api/portraits/thumb/men/76.jpg"
                      alt="Add New"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full brightness-50"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs font-semibold">Find More</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Search Bar */}
          <div className="bg-[#2d2d42] rounded-lg p-3 mb-8 flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="search"
              placeholder="Search here..."
              className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex gap-2 ml-auto">
              <Button size="icon" variant="ghost" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1Z"></path>
                  <path d="M4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2Z"></path>
                </svg>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15V6"></path>
                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                  <path d="M12 12H3"></path>
                  <path d="M16 6H3"></path>
                  <path d="M12 18H3"></path>
                </svg>
              </Button>
            </div>
          </div>

          {/* Featured Posts */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Featured Posts</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-400 flex items-center gap-1"
              >
                See All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-[#2d2d42] border-none rounded-xl overflow-hidden col-span-2">
                  <CardContent className="p-0 relative">
                    <Image
                      src="/placeholder.svg?height=300&width=600"
                      alt="Workout"
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <div className="h-8 px-2 rounded-full bg-black/30 backdrop-blur-sm flex items-center text-xs">
                        1.2k
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2d2d42] border-none rounded-xl overflow-hidden">
                  <CardContent className="p-0 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Nutrition"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full bg-black/30 backdrop-blur-sm"
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2d2d42] border-none rounded-xl overflow-hidden">
                  <CardContent className="p-0 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Equipment"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full bg-black/30 backdrop-blur-sm"
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-[#2d2d42] border-none rounded-xl overflow-hidden col-span-2">
                  <CardContent className="p-0 relative">
                    <Image
                      src="/placeholder.svg?height=300&width=600"
                      alt="Gym"
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <div className="h-8 px-2 rounded-full bg-black/30 backdrop-blur-sm flex items-center text-xs">
                        2.5k
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2d2d42] border-none rounded-xl overflow-hidden">
                  <CardContent className="p-0 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Supplements"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full bg-black/30 backdrop-blur-sm"
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#2d2d42] border-none rounded-xl overflow-hidden">
                  <CardContent className="p-0 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Workout Plan"
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full bg-black/30 backdrop-blur-sm"
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 p-4 border-l border-[#2d2d42] hidden lg:block">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Suggested Gyms</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400"
              >
                See All
              </Button>
            </div>

            <Card className="bg-[#2d2d42] border-none rounded-xl overflow-hidden mb-4">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Gym"
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <h4 className="font-semibold">Metropolis Fitness Center</h4>
                    <p className="text-xs text-gray-300">654 Members</p>
                    <div className="flex mt-2">
                      <Avatar className="h-6 w-6 border border-purple-500">
                        <AvatarFallback>1</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border border-purple-500 -ml-2">
                        <AvatarFallback>2</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border border-purple-500 -ml-2">
                        <AvatarFallback>3</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border border-purple-500 -ml-2">
                        <AvatarFallback>+</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Suggested Friends</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400"
              >
                See All
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-purple-500">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Jackson Britons</h4>
                  <p className="text-xs text-gray-400">Trainer & Author</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-[#3d3d52]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-purple-500">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Amanda Smith</h4>
                  <p className="text-xs text-gray-400">Fitness Coach</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-[#3d3d52]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-purple-500">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Robert Johnson</h4>
                  <p className="text-xs text-gray-400">Nutritionist</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-[#3d3d52]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-purple-500">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>LT</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Lisa Thompson</h4>
                  <p className="text-xs text-gray-400">Yoga Instructor</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-[#3d3d52]"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
