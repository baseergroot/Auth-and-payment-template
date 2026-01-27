import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db/connection/mongodb";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./email";
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"


const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover", // Latest API version as of Stripe SDK v20.0.0
})

export const auth = betterAuth({
  database: mongodbAdapter(await client()),
  plugins: [nextCookies(), stripe({
    stripeClient,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    createCustomerOnSignUp: true,
    onCustomerCreate: async ({ stripeCustomer, user }, ctx) => {
        // Do something with the newly created customer
        console.log(`Customer ${stripeCustomer.id} created for user ${user.id}`);
    },
    subscription: {
    enabled: true,
    plans: [
        {
            name: "basic", // the name of the plan, it'll be automatically lower cased when stored in the database
            priceId: process.env.BASIC_PRICE_ID, // the price ID from stripe
            limits: {
                projects: 5,
                storage: 10
            }
        },
        {
            name: "pro",
            priceId: process.env.PRO_PRICE_ID, // the price ID from stripe
            limits: {
                projects: 20,
                storage: 50
            },
            freeTrial: {
                days: 14,
            }
        }
    ]
}
  })],
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