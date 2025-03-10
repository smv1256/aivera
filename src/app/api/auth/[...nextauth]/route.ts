/* AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
 * AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
 * UGH.
 * TODO: Get login to work. **/

/** import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { getFirestore } from "firebase-admin/firestore";
import { adminDB } from "../../../../backend/lib/firestoreAdmin";
import { compare } from "bcrypt-ts";

export const authOptions = {
  adapter: FirestoreAdapter(getFirestore()), // Store sessions in Firestore
  session: {
    strategy: "jwt" as "jwt", // Use JWT-based authentication
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const userRef = adminDB.collection("users").doc(credentials.email as string);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
          throw new Error("User not found");
        }

        const user = userSnap.data() as { email: string; password: string; name: string };

        // Verify password
        if (!user) {
          throw new Error("User data is undefined");
        }

        const validPassword = await compare(credentials.password as string, user.password as string);

        if (!validPassword) {
          throw new Error("Invalid credentials");
        }

        return { id: user.email, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.uid = token.uid as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions); **/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { getFirestore } from "firebase-admin/firestore";
import { adminDB } from "../../../../backend/lib/firestoreAdmin";
import { compare } from "bcrypt-ts";

const handler = NextAuth({
    adapter: FirestoreAdapter(getFirestore()), // Store sessions in Firestore
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", required: true },
          password: { label: "Password", type: "password", required: true },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }
  
          const userRef = adminDB.collection("users").doc(credentials.email as string);
          const userSnap = await userRef.get();
  
          if (!userSnap.exists) {
            throw new Error("User not found");
          }
  
          const user = userSnap.data() as { email: string; password: string; name: string };
  
          const validPassword = await compare(credentials.password as string, user.password);
          if (!validPassword) {
            throw new Error("Invalid credentials");
          }
  
          return { id: user.email, name: user.name, email: user.email };
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) token.uid = user.id;
        return token;
      },
      async session({ session, token }) {
        if (session.user) (session.user as any).uid = token.uid;
        return session;
      },
    },
    secret: process.env.AUTH_SECRET,
  });
  export { handler as GET, handler as POST };
  
