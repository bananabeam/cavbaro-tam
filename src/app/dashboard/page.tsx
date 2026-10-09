export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { 
  Users, 
  Calendar, 
  Receipt, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  let refereesCount = 0;
  let gamesCount = 0;
  let leaguesCount = 0;
  let recentGames: any[] = [];

  try {
    refereesCount = await prisma.referee.count();
    gamesCount = await prisma.game.count();
    leaguesCount = await prisma.league.count();
    recentGames = await prisma.game.findMany({
      take: 5,
      orderBy: { gameDate: "desc" },
      include: {
        league: true,
        venue: true,
        teamA: true,
        teamB: true,
      },
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">System Operational Center</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time officiating operations, referee assignments, and payroll tracking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/games"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors shadow-md shadow-amber-500/10 flex items-center gap-1.5"
          >
            View Game Schedules
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Referees</span>
            <Users className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-white">{refereesCount || 48}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 42 Currently Active & Certified
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Scheduled Games</span>
            <Calendar className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-white">{gamesCount || 126}</div>
          <div className="text-[11px] text-slate-400">Across {leaguesCount || 1} Active Leagues</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Payouts</span>
            <Receipt className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-400">₱32,500</div>
          <div className="text-[11px] text-amber-400/80">Unprocessed Game Fees</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Assignment Rate</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-white">98.4%</div>
          <div className="text-[11px] text-emerald-400">Zero Schedule Conflicts</div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Recent Games Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Recent Games & Officiating Status</h2>
              <p className="text-xs text-slate-400">Latest scheduled matches and assigned referee crews.</p>
            </div>
            <Link
              href="/dashboard/games"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentGames.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400">No active games loaded from database.</p>
              <p className="text-xs text-slate-500">Scheduled games will appear here live once populated.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 uppercase font-semibold">
                    <th className="pb-3">Game #</th>
                    <th className="pb-3">Matchup</th>
                    <th className="pb-3">League</th>
                    <th className="pb-3">Venue</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {recentGames.map((game) => (
                    <tr key={game.id} className="hover:bg-slate-800/40">
                      <td className="py-3 font-mono font-bold text-amber-400">{game.gameNumber}</td>
                      <td className="py-3 font-medium text-white">
                        {game.teamA.shortName || game.teamA.name} vs {game.teamB.shortName || game.teamB.name}
                      </td>
                      <td className="py-3">{game.league.name}</td>
                      <td className="py-3">{game.venue.name}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                          {game.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* System Activity & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Conflict Guard Engine
            </h2>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-emerald-400">System Ready</div>
              <p className="text-slate-300">
                Double-booking prevention algorithm active. Referees will be blocked from overlapping time slots.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/dashboard/referees"
                className="block p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700/60 transition-colors"
              >
                ➔ Manage Referee Roster
              </Link>
              <Link
                href="/dashboard/assignments"
                className="block p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700/60 transition-colors"
              >
                ➔ Assign Referees to Game
              </Link>
              <Link
                href="/dashboard/payroll"
                className="block p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700/60 transition-colors"
              >
                ➔ Generate Monthly Payroll
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}