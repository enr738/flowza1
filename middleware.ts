import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: [
        '/',
        '/explore(.*)',
        '/gigs(.*)',
        '/contact',
        '/faq',
        '/terms',
        '/sign-in(.*)',
        '/sign-up(.*)',
        '/api/contact/whatsapp',
        '/api/webhooks/clerk',
        '/api/payment/webhook',
    ]
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
