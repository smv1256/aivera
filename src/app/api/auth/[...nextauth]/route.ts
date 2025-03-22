import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
// import { type NextAuthOptions } from "next-auth";
// import { getFirestore } from "firebase-admin/firestore";
import { adminDB } from "../../../../backend/lib/firestoreAdmin";
import { compare } from "bcrypt-ts";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const authOptions /*: NextAuthOptions*/ = {
  adapter: FirestoreAdapter(adminDB), 
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials): Promise<{ id: string; name: string; email: string } | null> {
        console.log("Authorize", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          // throw new Error("Email and password are required");
          return null;
        }

        console.log(credentials);
        const userRef = adminDB.collection("users").doc(credentials.email as string);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
          console.error("User not found");
          // throw new Error("User not found");
          return null;
        }

        const user = userSnap.data() as { email: string; password: string; name: string };

        console.log("Entered pwd:", credentials.password);
        console.log("Db hashed pwd:", user.password);
        const validPassword = await compare(credentials.password as string, user.password);
        console.log("Password match:", validPassword);

        if (!validPassword) {
          console.error("Invalid credentials");
          // throw new Error("Invalid credentials");
          return null;
        }

        return { id: user.email, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as any).uid = token.uid;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

console.log("initializing");
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
