"use server"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function googleSignIn() {
  const response = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: process.env.BETTER_AUTH_URL
    }
  })

  console.log({googleRes: response});
  redirect(response.url!)
  
}