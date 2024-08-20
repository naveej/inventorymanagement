import { connectDB } from "@/lib/database"
import UserModel from "@/models/UserModel"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { signToken } from "@/lib/authUtils"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            authorize: async (credentials):Promise<any> => {
                let user = null
                console.log("Authorizing User")
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                    }

                    await connectDB()
                    const userExists = await UserModel.findOne({ email: credentials.email })
                    const matchpassword = await bcrypt.compare(credentials.password, userExists.password);

                    if (!userExists || !matchpassword) {
                        throw new Error("Invalid User Credentials")
                    }

                    const userInfo = {
                        firstName: userExists?.firstName,
                        lastName: userExists?.lastName,
                        registerNo: userExists?.registerNo,
                        email: userExists?.email,
                        departmentName: userExists?.departmentName,
                        role: userExists?.role,
                    }

                    const accessToken = signToken(userInfo)
                    user = { ...userInfo, accessToken }

                    return user
                } catch (error) {
                    console.error("Credentials Auth: " + error)
                    return null
                }
            },
        })
    ],
    // callbacks: {
    //     // async session({ session, token, user }) => {
    //     //     console.log(session)
    //     //     return {
    //     //         ...session,
    //     //         user: {
    //     //             ...session.user,
    //     //             id: token.id,
    //     //             items: token.items
    //     //         }
    //     //     }
    //     // },
    //     async session({ session, token, user }) {
    //         console.log(session, token, user)
    //         return session
    //     },
    //     jwt: ({ user, token }) => {
    //         console.log(token)
    //         if (user) {
    //             return {
    //                 ...token,
    //                 ...user,
    //             }
    //         }
    //         return token
    //     }
    // },
    // session: {
    //     strategy: 'jwt'
    // },
    // secret: process.env.NEXTAUTH_SECRET,
    // debug: process.env.NODE_ENV === "development",
})