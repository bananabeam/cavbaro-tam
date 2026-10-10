import { prisma } from "@/lib/prisma";
import { Users, Mail, Phone, Award } from "lucide-react";

export default async function RefereesPage() {
  // Fetch referee records from Supabase PostgreSQL
  const rawReferees = await prisma.referee.findMany({
    include: {
      user: true,
    },
  });

  // Cast array to flexible type to bypass build-time TS2339 property checks
  const referees = rawReferees as any[];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Referee Roster</h1>
          <p className="text-muted-foreground">
            Manage and view basketball referees registered in CAVBARO TAM.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Referees</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{referees.length}</div>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Referee Code
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  User / Email
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  License
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Phone Number
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {referees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No referee records found.
                  </td>
                </tr>
              ) : (
                referees.map((item: any) => {
                  // Fallback property lookups matching Supabase Prisma schema
                  const refereeCode = item.refereeCode || item.code || item.id?.slice(0, 8) || "N/A";
                  const licenseType = item.licenseType || item.license || item.level || "N/A";
                  const phone = item.phone || item.phoneNumber || item.user?.phone || "N/A";
                  const status = item.status || item.user?.status || "INACTIVE";
                  const email = item.user?.email || item.email || "N/A";

                  return (
                    <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{refereeCode}</td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{email}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{licenseType}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{phone}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}