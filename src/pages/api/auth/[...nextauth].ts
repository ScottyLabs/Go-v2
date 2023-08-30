import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import env from "env/server.mjs";
import prisma from "server/db/client";

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      if (profile) token.profile = profile;
      if (account?.access_token) token.accessToken = account.access_token;
      return token;
    },
    signIn: async ({ user }) => {
      const isAllowedToSignIn =
        user.email && env.AUTHORIZED_ACCOUNTS.includes(user.email);
      return !!isAllowedToSignIn;
    },
    session: async ({ session, token }) => {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
  session: { strategy: "jwt" },
  theme: { logo: "/dog-logo.svg" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
