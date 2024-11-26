import type { NextAuthConfig } from 'next-auth';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './prisma';
import { PrismaAdapter } from "@auth/prisma-adapter"

export class EmailNotVerified extends CredentialsSignin {
    code = "Email is not verified";
}

export class InvalidCrendentials extends CredentialsSignin {
    code = "Invalid email or password";
}

export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  adapter: PrismaAdapter({ prisma }),
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isNotOnLoginPage = nextUrl.pathname.startsWith('/sign-in') || nextUrl.pathname.startsWith('/sign-up');

      if (!isNotOnLoginPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
        id: 'credentials',
        async authorize(credentials) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(8) })
              .safeParse(credentials);

            if (!parsedCredentials.success) throw new InvalidCrendentials();
            const { email, password } = parsedCredentials.data;

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) throw new InvalidCrendentials();
            if(user.password !== password) throw new InvalidCrendentials();
            // if (!user.emailVerified) throw new EmailNotVerified();

            // TODO: Check password with salt.
            return user;
        },
    })
  ],
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
});
