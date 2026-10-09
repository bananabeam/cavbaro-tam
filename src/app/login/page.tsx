"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password: password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please check your spelling or re-run database seeding.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-2 bg-slate-900/80 border border-slate-700/80 rounded-full mb-2">
            <Image
              src="/logo.png"
              alt="CAVBARO TAM Logo"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CAVBARO TAM</h1>
          <p className="text-sm text-slate-400">Sign in to access your portal dashboard</p>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cavbarotam.ph"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 focus:outline-none transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-slate-950 font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-700/50 text-center text-xs text-slate-500">
          Default Admin Login: <span className="text-slate-300">admin@cavbarotam.ph</span> / <span className="text-slate-300">CavbaroAdmin2026!</span>
        </div>
      </div>
    </div>
  );
}