import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as Auth from "../../../lib/auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Login",
      type: "credentials",
      async authorize(credentials) {
        try {
          const result = await Auth.login(credentials);
          result.isLoggedIn = true;
          return result;
        } catch (error) {
          console.log(error.message);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "Signup",
      type: "credentials",
      async authorize(credentials) {
        try {
          const result = await Auth.signup(credentials);
          result.isLoggedIn = true;
          return result;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // user is the return object from authorize
      if (user.isLoggedIn) {
        return true;
      }

      return false;
    },
    async session({ session }) {
      session.user.isLoggedIn = true;
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  // use env variable in production
  secret: "looselipssinkships",
});
