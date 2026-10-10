import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    "cavbaro_tam_secret_key_2026_super_secure",

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase().trim(),
          },
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        let isPasswordValid = false;
        try {
          isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
        } catch {
          // Fallback check if seed password was stored unhashed
          isPasswordValid = credentials.password === user.passwordHash;
        }

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.email.split("@")[0],
          role: (user as any).role || "ADMIN",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};

// Helper function to resolve session calls in Server Components/Layouts
export async function auth(...args: any[]) {
  if (typeof args[0] === "function") {
    const handler = args[0];
    return async (req: any, ctx: any) => {
      const session = await getServerSession(authOptions);
      (req as any).auth = session;
      return handler(req, ctx);
    };
  }
  return await getServerSession(authOptions);
}

// Sign-out action helper for server component layouts
export async function signOut() {
  return { url: "/login" };
}