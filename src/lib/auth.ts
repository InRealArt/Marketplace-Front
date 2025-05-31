import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react"

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: { 
        enabled: true,
        autoSignIn: true,
        async sendResetPassword(data, request) {
            // @TODO: Handle the resend password email
            console.log('Resend password ==> ', data, request);
        },
        plugins: [nextCookies()]
    },
    oauth: {
        providers: {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID || "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
                redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
                scope: "email profile",
            },
            twitter: {
                clientId: process.env.TWITTER_CLIENT_ID || "",
                clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
                redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/twitter`,
            }
        }
    }
});

export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const { signIn, signOut, signUp, useSession } = createAuthClient()