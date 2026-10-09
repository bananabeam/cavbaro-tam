import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserCheck, 
  Receipt, 
  CreditCard, 
  FileText, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as any;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="h-20 border-b border-slate-800 px-6 flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="CAVBARO TAM Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <div>
            <span className="text-base font-extrabold tracking-tight text-white block leading-none">
              CAVBARO TAM
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-500">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto text-xs font-semibold">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Main Management
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/referees"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Referees Roster</span>
          </Link>

          <Link
            href="/dashboard/games"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Game Schedules</span>
          </Link>

          <Link
            href="/dashboard/assignments"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <UserCheck className="w-4 h-4" />
            <span>Referee Assignments</span>
          </Link>

          <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Finance & Payroll
          </div>

          <Link
            href="/dashboard/payroll"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <Receipt className="w-4 h-4" />
            <span>Payroll Engine</span>
          </Link>

          <Link
            href="/dashboard/withdrawals"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>Withdrawals</span>
          </Link>

          <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Organization
          </div>

          <Link
            href="/dashboard/announcements"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span>Announcements</span>
          </Link>

          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Reports Exporter</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>System Settings</span>
          </Link>
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-amber-400 uppercase font-semibold">{user.role}</div>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 border border-slate-700/80 hover:border-red-500/30 rounded-lg py-2 text-xs font-semibold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-slate-800 bg-slate-900/40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>CAVBARO TAM System</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-semibold">Management Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Database Connected</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
            >
              View Public Website ↗
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}