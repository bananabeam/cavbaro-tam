import { auth } from "@/auth";

export default auth(() => {
  // Protects routes under /dashboard
});

export const config = {
  matcher: ["/dashboard/:path*"],
};