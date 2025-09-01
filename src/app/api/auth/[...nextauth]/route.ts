import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Create NextAuth handler using config
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
