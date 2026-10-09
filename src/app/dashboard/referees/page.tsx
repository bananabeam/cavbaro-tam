import { prisma } from "@/lib/prisma";
import { Users, Search, Mail, Phone, Award } from "lucide-react";

export default async function RefereesPage() {
  let referees: any[] = [];

  try {
    referees = await prisma.referee.findMany({
      include: {
        user: true,
      },
    });
  } catch (err) {
    console.error("Error loading referees:", err);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Accredited Referees Roster
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage organization referees, FIBA license certifications, and active status.
          </p>
        </div>
      </div>

      {/* Referees Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search referee name or code..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Total Records: <strong className="text-amber-400">{referees.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/60 text-slate-400 uppercase border-b border-slate-800 font-semibold">
                <th className="py-3 px-4">Referee ID</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {referees.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    No referee records found in database.
                  </td>
                </tr>
              ) : (
                referees.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">
                      {item.refereeCode || item.id.substring(0, 8)}
                    </td>
                    <td className="py-3 px-4 font-medium text-white">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        {item.user?.email || "N/A"}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        {item.phone || item.phoneNumber || "N/A"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          (item.status || item.user?.status) === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {item.status || item.user?.status || "ACTIVE"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}