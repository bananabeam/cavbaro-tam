import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Users, Shield, Activity } from "lucide-react";

// Async component handling dynamic database queries
async function DashboardStats() {
  let refereeCount = 0;
  let activeRefereeCount = 0;
  let userCount = 0;

  try {
    refereeCount = await prisma.referee.count();
    activeRefereeCount = await prisma.referee.count({
      where: {
        status: "ACTIVE",
      },
    });
    userCount = await prisma.user.count();
  } catch (error) {
    console.error("Dashboard metrics database query error:", error);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Total Referees</h3>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{refereeCount}</div>
        <p className="text-xs text-muted-foreground mt-1">
          Registered in CAVBARO roster
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Active Referees</h3>
          <Shield className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="text-2xl font-bold">{activeRefereeCount}</div>
        <p className="text-xs text-muted-foreground mt-1">
          Available for assignment
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">System Users</h3>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{userCount}</div>
        <p className="text-xs text-muted-foreground mt-1">
          Total accounts created
        </p>
      </div>
    </div>
  );
}

// Fallback UI rendered during static shell prerendering
function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <div key={index} className="rounded-xl border bg-card p-6 shadow-sm animate-pulse">
          <div className="h-4 w-28 bg-muted rounded mb-4" />
          <div className="h-8 w-12 bg-muted rounded mb-2" />
          <div className="h-3 w-36 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}

// Main page component wrapped with Suspense boundary
export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          CAVBARO TAM Basketball Referee Management Portal
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
      </Suspense>
    </div>
  );
}