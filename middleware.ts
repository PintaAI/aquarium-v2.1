import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_REDIRECT_URL,
} from "@/routes"


const {auth} = NextAuth(authConfig)
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);


  if (isApiAuthRoute){
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl))
  }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/register", nextUrl));
  }

  return;
  // req.auth
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}