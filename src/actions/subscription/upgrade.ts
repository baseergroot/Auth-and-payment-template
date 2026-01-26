"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { success } from "zod";



export default async function upgradeSubscription() {

  try {
    const data = await auth.api.upgradeSubscription({
      body: {
        plan: "pro", // required
        successUrl: process.env.BETTER_AUTH_URL + "/payment/success", // required
        cancelUrl: process.env.BETTER_AUTH_URL + "/payment/cancel", // required
        returnUrl: process.env.BETTER_AUTH_URL,
        disableRedirect: false, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    console.log("Checkout session created:", data.url);
    return { success: true, url: data.url, message: "redirecting to checkout" };
  } catch (error) {
    console.error("Error upgrading subscription:", error);
    return { success: false, error: "Failed to upgrade subscription." };
  }
}

