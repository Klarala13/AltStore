import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${process.env.API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data = (await res.json()) as { accessToken: string };

          // Decode the JWT payload to get developer id and email.
          // We trust this token because it was issued by our own NestJS API.
          const [, payloadB64] = data.accessToken.split(".");
          const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8")) as {
            sub: string;
            email: string;
            isAdmin?: boolean;
          };

          return {
            id: payload.sub,
            email: payload.email,
            isAdmin: payload.isAdmin ?? false,
            // Attach the NestJS JWT so Server Components / API routes can forward it
            accessToken: data.accessToken,
          };
        } catch {
          return null;
        }
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email ?? token.email;
        if ("accessToken" in user) {
          token.accessToken = user.accessToken as string;
        }
        if ("isAdmin" in user) {
          token.isAdmin = user.isAdmin as boolean;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub;
      }
      (session as { accessToken?: string }).accessToken = token.accessToken as string | undefined;
      (session as { isAdmin?: boolean }).isAdmin = token.isAdmin as boolean | undefined;
      return session;
    },
  },
};
