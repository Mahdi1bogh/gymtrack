import { MainNav } from "@/components/gyms/main-nav";
import { Dumbbell } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 flex-col border-r bg-muted/10 p-4 md:flex">
        <div className="flex h-14 items-center px-4 font-semibold">
          <Dumbbell className="mr-2 h-6 w-6" /> GymFlow
        </div>
        <MainNav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
