import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Dumbbell, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-bold">FitTrack</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm hover:text-purple-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#gyms"
            className="text-sm hover:text-purple-400 transition-colors"
          >
            Gyms
          </Link>
          <Link
            href="#marketplace"
            className="text-sm hover:text-purple-400 transition-colors"
          >
            Marketplace
          </Link>
          <Link
            href="#testimonials"
            className="text-sm hover:text-purple-400 transition-colors"
          >
            Testimonials
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-white hover:text-purple-400"
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your <span className="text-purple-500">Fitness Journey</span>{" "}
              Starts Here
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Track your workouts, manage your nutrition, connect with trainers,
              and shop for fitness gear - all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/app/page">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-30"></div>
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Fitness Platform"
              width={600}
              height={600}
              className="relative z-10 rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#252542]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              FitTrack brings together all aspects of your fitness journey in
              one seamless platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a2e] p-8 rounded-2xl border border-[#3d3d52]">
              <div className="h-14 w-14 bg-purple-900 rounded-xl flex items-center justify-center mb-6">
                <User className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Personal Profile</h3>
              <p className="text-gray-300 mb-6">
                Track your progress, set goals, manage workout plans, and
                monitor your nutrition all in one place.
              </p>
              <Link
                href="/profile"
                className="text-purple-400 flex items-center gap-2 text-sm font-medium"
              >
                Explore Profile <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-[#1a1a2e] p-8 rounded-2xl border border-[#3d3d52]">
              <div className="h-14 w-14 bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                <Dumbbell className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Gym Management</h3>
              <p className="text-gray-300 mb-6">
                For gym owners: manage your facility, members, classes, and
                trainers with powerful tools.
              </p>
              <Link
                href="/gyms"
                className="text-blue-400 flex items-center gap-2 text-sm font-medium"
              >
                Explore Gyms <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-[#1a1a2e] p-8 rounded-2xl border border-[#3d3d52]">
              <div className="h-14 w-14 bg-pink-900 rounded-xl flex items-center justify-center mb-6">
                <ShoppingBag className="h-7 w-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Marketplace</h3>
              <p className="text-gray-300 mb-6">
                Shop for fitness equipment, supplements, apparel, and more from
                trusted vendors.
              </p>
              <Link
                href="/marketplace"
                className="text-pink-400 flex items-center gap-2 text-sm font-medium"
              >
                Explore Marketplace <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Join thousands of users who have already taken their fitness to
              the next level with FitTrack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-gray-100 w-full sm:w-auto"
                >
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/app/page">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#252542] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Dumbbell className="h-6 w-6 text-purple-500" />
                <span className="text-lg font-bold">FitTrack</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your all-in-one fitness platform for tracking progress,
                connecting with trainers, and shopping for fitness gear.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-white transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gyms"
                    className="hover:text-white transition-colors"
                  >
                    Gyms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="hover:text-white transition-colors"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trainers"
                    className="hover:text-white transition-colors"
                  >
                    Trainers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#3d3d52] mt-12 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} FitTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
