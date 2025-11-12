import NextAuth, { User } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import * as bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);
        if (user.length === 0) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password.toString(),
          user[0].password,
        );
        if (!isPasswordValid) return null;
        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
          image: user[0].profileImage || null,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }
      return session;
    },
    authorized: async ({ request, auth }) => {
      const { pathname } = request.nextUrl;

      if (pathname.startsWith("/admin")) return !!auth;

      return true;
    },
  },
});
