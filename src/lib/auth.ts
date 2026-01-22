import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db/connection/mongodb";
import { nextCookies } from "better-auth/next-js";
import emailjs from "@emailjs/nodejs";
import { sendEmail } from "./email";

export const auth = betterAuth({
  database: mongodbAdapter(await client()),
  plugins: [nextCookies()],
  user: {
    modelName: "users"
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        html: `
          <div style="font-family: sans-serif; text-align: center;">
            <h2>Welcome, ${user.name}!</h2>
            <p>Click the button below to verify your email and complete your signup.</p>
            <a href="${url}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">If the button doesn't work, copy this link: ${url}</p>
          </div>
        `,
      });
    },
    autoSignInAfterVerification: true
  },

  socialProviders: {
    google: {
      enabled: true,
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowEmailLogin: true,
    }
  },
});