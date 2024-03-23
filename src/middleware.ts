import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/qr"]
});

export const config = {
  matcher: ["/dashboard", "/(api|trpc)(.*)"],

};
