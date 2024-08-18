import { connectDB } from "@/lib/database"
import UserModel from "@/models/UserModel"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { userTypes } from "@/store/useUserStore"

type credentialsType = {
    email: string,
    password: string
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            authorize: async (credentials) => {
                let user = null

                try {
                    if (!credentials.email || !credentials.password) {
                        return null
                    }

                    await connectDB()
                    const userExists = await UserModel.findOne({ email: credentials?.email })
                    const matchpassword = bcrypt.compare(userExists?.password, credentials?.password as string)

                    if (!userExists || !matchpassword) {
                        throw new Error("Invalid User Credentials")
                    }

                    user = {
                        firstName: userExists?.firstName,
                        lastName: userExists?.lastName,
                        registerNo: userExists?.registerNo,
                        email: userExists?.email,
                        deptName: userExists?.deptName,
                        role: userExists?.role,
                    }
                } catch (error) {

                }

                // logic to salt and hash password
                // const pwHash = saltAndHashPassword(credentials.password)

                // logic to verify if the user exists
                // user = await getUserFromDb(credentials.email, pwHash)

                // return user object with their profile data
                return user
            },
        })
    ],
})