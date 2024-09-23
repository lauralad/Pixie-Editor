import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/webhooks/clerk(.*)', '/api/webhooks/stripe(.*)'])
// TODO add '/' to public routes

// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request)) {
//     auth().protect()
//   }
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }
export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!.*\\..*|_next|api/webhooks/clerk|api/webhooks/stripe|$).*)', // Exclude static files, _next, and the specified webhook routes
    '/(api|trpc)(.*)',
  ],
}