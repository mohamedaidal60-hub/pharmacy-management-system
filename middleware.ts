import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized: ({ token }) => !!token
    }
});

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - /api/auth/* (NextAuth routes)
         * - /login (login page)
         * - /admin-fix (repair tool)
         * - /api/admin-fix (repair api)
         * - /_next/* (Next.js internals)
         * - /favicon.ico, /robots.txt, etc.
         */
        "/((?!api/auth|login|admin-fix|api/admin-fix|_next|favicon.ico|robots.txt).*)",
    ],
};
