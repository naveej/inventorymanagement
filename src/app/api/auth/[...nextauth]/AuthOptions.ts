import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/database";
import { signToken } from "@/lib/authUtils";
import UserModel from "@/models/UserModel";
import * as bcrypt from "bcrypt";
import { User } from "next-auth";

let UserAccount: User | null = null;

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await connectDB();
          const userExists = await UserModel.findOne({
            email: credentials?.email,
            password: { $exists: true, $ne: null },
          });
          const matchPassword = await bcrypt.compare(
            credentials?.password,
            userExists?.password
          );

          // If no user or If user exists but incorrect password, throw error
          if (!userExists || !matchPassword)
            throw new Error("Invalid Email or Password");

          const userData = {
            id: userExists?._id,
            firstName: userExists?.firstName,
            lastName: userExists?.lastName,
            email: userExists?.email,
            role: userExists?.role,
          };

          const accessToken = signToken(userData);
          UserAccount = { ...userData, accessToken };

          return UserAccount;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
          const userData = {
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            role: user?.role,
          };
          const accessToken = signToken(userData);
          token = { ...userData, accessToken };
        }
      return token;
    },
    // console.log("\nNewToken", token)
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  // events: {
  //     signIn(message) {
  //         console.log("\nSignInEvent", message)
  //     },
  //     session(message) {
  //         console.log("\nSessionEvent", message)
  //     },
  //     signOut(message) {
  //         console.log("\nSignOutEvent", message)
  //     },
  // },
  secret: process.env.ACCESS_TOKEN_SECRET,
  // debug: process.env.NODE_ENV === "development",
};
