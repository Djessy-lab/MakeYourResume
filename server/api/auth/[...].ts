import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: runtimeConfig.authSecret,
  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    // @ts-ignore
    GoogleProvider.default({
      clientId: runtimeConfig.public.GOOGLE_CLIENT_ID,
      clientSecret: runtimeConfig.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // @ts-ignore
  basePath: "/api/auth",
  baseUrl:  'http://localhost:3000',
});
