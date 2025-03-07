import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import hashPassword from "@/backend/utils/passwords";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        let user = null;
 
        const pwHash = hashPassword(credentials.password);
 
        user = await getUserFromDb(credentials.email, pwHash);
 
        if (!user) {
          // REGISTRATION
          throw new Error("Invalid credentials.");
        }
 
        return user;
      },
    }),
  ],
});
