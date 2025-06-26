import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

// Define your NextAuth config
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
      //  console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        console.log('user', user);
        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log(user, isValid);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],

  session: {
    strategy: 'jwt' as SessionStrategy,
  },

  pages: {
    signIn: '/login', // your custom login page route
  },
};

// Create NextAuth handler using config
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
