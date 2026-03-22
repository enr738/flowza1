import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: [
        '/',
        '/explore(.*)',
        '/gigs(.*)',
        '/contact',
        '/sign-in(.*)',
        '/sign-up(.*)',
        '/api/contact/whatsapp',
        '/api/webhooks/clerk',
    ]
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
