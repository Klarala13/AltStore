import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";

interface NestJwtPayload {
  sub: string;
  email: string;
  isAdmin?: boolean;
}

function parseJwtPayload(accessToken: string): NestJwtPayload | null {
  const parts = accessToken.split(".");
  if (parts.length !== 3) return null;

  try {
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8")) as NestJwtPayload;
  } catch {
    return null;
  }
}

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
          const payload = parseJwtPayload(data.accessToken);
          if (!payload) return null;

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
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.APPLE_ID && process.env.APPLE_SECRET
      ? [
          AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: process.env.APPLE_SECRET,
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
    async jwt({ token, user, account }) {
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

      if (account?.provider && account.provider !== "credentials" && !token.accessToken) {
        try {
          if (!token.email) return token;

          const res = await fetch(`${process.env.API_URL}/auth/social-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              provider: account.provider,
              email: token.email,
              name: token.name ?? token.email,
            }),
          });

          if (res.ok) {
            const data = (await res.json()) as { accessToken: string };
            const payload = parseJwtPayload(data.accessToken);

            if (payload) {
              token.sub = payload.sub;
              token.email = payload.email;
              token.isAdmin = payload.isAdmin ?? false;
              token.accessToken = data.accessToken;
            }
          }
        } catch {
          // Keep OAuth session alive even if API handshake fails.
          // UI can still show authenticated state while backend features stay protected.
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
