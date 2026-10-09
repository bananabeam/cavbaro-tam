import Link from "next/link";
import Image from "next/image";
import { 
  Shield, 
  Award, 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  MapPin, 
  LogIn 
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-400 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Metro Manila & Cavite Region, PH</span>
            <span className="hidden md:flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-500" /> info@cavbarotam.ph</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-medium">Official FIBA Rules Compliant</span>
            <Link href="/login" className="flex items-center gap-1 text-slate-200 hover:text-amber-400 transition-colors font-semibold">
              <LogIn className="w-3.5 h-3.5" /> Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="CAVBARO TAM Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white block leading-none">CAVBARO TAM</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-500">Basketball Referees Org</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <Link href="/" className="text-amber-500">Home</Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link>
            <Link href="/referees" className="hover:text-amber-400 transition-colors">Referees</Link>
            <Link href="/officers" className="hover:text-amber-400 transition-colors">Officers</Link>
            <Link href="/leagues" className="hover:text-amber-400 transition-colors">Leagues</Link>
            <Link href="/games" className="hover:text-amber-400 transition-colors">Games</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/apply" 
              className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors shadow-md shadow-amber-500/10"
            >
              Become a Referee
            </Link>
            <Link 
              href="/login" 
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase">
                <Award className="w-4 h-4" /> Professional Basketball Officiating
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Integrity on Every Call. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  Excellence on Every Court.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                CAVBARO TAM is a premier basketball referees organization in the Philippines, delivering disciplined, fair, and authoritative officiating across amateur, corporate, collegiate, and provincial leagues.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 text-sm transition-all"
                >
                  Book Our Officials <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/games"
                  className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2 text-sm transition-colors"
                >
                  <Calendar className="w-4 h-4 text-amber-500" /> View Game Schedule
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">48+</div>
                  <div className="text-xs text-slate-400 font-medium">Accredited Referees</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">120+</div>
                  <div className="text-xs text-slate-400 font-medium">Games Monthly</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">15+</div>
                  <div className="text-xs text-slate-400 font-medium">Partner Leagues</div>
                </div>
              </div>
            </div>

            {/* Hero Card Visual */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live League Operations
                  </span>
                  <span className="text-xs font-mono text-slate-400">PHP / Manila Standard Time</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-400">Active Tournament</div>
                      <div className="text-sm font-bold text-white">Governor Cup Inter-Barangay</div>
                    </div>
                    <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md font-semibold border border-amber-500/20">
                      In Progress
                    </span>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-slate-400">Featured Upcoming Match</div>
                    <div className="text-sm font-bold text-white flex justify-between items-center">
                      <span>Poblacion Warriors</span>
                      <span className="text-amber-500 font-mono">VS</span>
                      <span>San Jose Titans</span>
                    </div>
                    <div className="text-xs text-slate-400 flex justify-between pt-1">
                      <span>Cavite Provincial Gym</span>
                      <span>Scheduled: 6:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center justify-between">
                  <div className="text-xs text-amber-300 font-medium">
                    Are you a qualified basketball official?
                  </div>
                  <Link href="/apply" className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                    Apply Now <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-amber-500 uppercase">Foundational Pillars</h2>
            <p className="text-3xl font-extrabold text-white">Built on Officiating Standard Integrity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Strict Rule Accuracy",
                desc: "Up-to-date with current FIBA mechanics, instant referee communication protocols, and table official precision.",
                icon: Shield,
              },
              {
                title: "Uncompromising Fairness",
                desc: "Impartial officiating maintained through independent evaluations and strict ethical code compliance.",
                icon: CheckCircle2,
              },
              {
                title: "Disciplined Authority",
                desc: "Strong court presence and professionalism that commands respect from players, coaches, and organizers.",
                icon: Trophy,
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-amber-500/40 transition-colors">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{value.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 border-t border-slate-800 text-xs text-slate-400 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="CAVBARO TAM Logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="text-base font-bold text-white">CAVBARO TAM</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Professional Basketball Referees Organization operating across Cavite, Metro Manila, and Luzon provinces.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-amber-400">About CAVBARO TAM</Link></li>
              <li><Link href="/referees" className="hover:text-amber-400">Accredited Roster</Link></li>
              <li><Link href="/leagues" className="hover:text-amber-400">Tournaments & Leagues</Link></li>
              <li><Link href="/apply" className="hover:text-amber-400">Join as Referee</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Officiating Services</h4>
            <ul className="space-y-2">
              <li>Basketball Referee Assignment</li>
              <li>Table Officials & Scorers</li>
              <li>Tournament Consultation</li>
              <li>Referee Refresher Clinics</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Contact Us</h4>
            <p className="space-y-1">
              <span>Cavite & Metro Manila, Philippines</span><br />
              <span>Email: info@cavbarotam.ph</span><br />
              <span>Hotline: +63 917 888 1234</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
          <span>© 2026 CAVBARO TAM Professional Basketball Referees Organization. All rights reserved.</span>
          <span className="text-slate-500">System Timezone: Asia/Manila (PST)</span>
        </div>
      </footer>
    </div>
  );
}