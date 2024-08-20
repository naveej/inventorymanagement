import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id?: string | null,
        uid?: string | null,
        firstName?: string | null,
        lastName?: string|null,
        email?: string | null,
        accessToken?: string | null,
        role?: string | null,
        departmentName?: string | null
    }

    interface Session {
        user?: User,
        expires?: string
    }
}