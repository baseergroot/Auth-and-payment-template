"use server"

import { auth } from "@/lib/auth";
import { InitialStateI } from "./forgot-password";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";

export default async function resetPassword(token: string, initialState: InitialStateI, formData: FormData) {


  try {
    // console.log({ token, formData });

    const newPassword = formData.get("new-password") as string
    if (!newPassword) {
      return { success: false, message: "New password should not be empty." }
    }
    const data = await auth.api.resetPassword({
      body: {
        newPassword, // required
        token, // required
      },
    })
    console.log({ data });
    if (data.status) {
      redirect("/login")
    }
    return { success: false, message: "something went wrong" }
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.log({ APIError: error });
      return error
    }
    if (error?.message == "NEXT_REDIRECT") {
      console.log({ error });
      throw error; // Re-throw the error so Next.js can handle the redirect
    }
    console.log({ error });
    return error

  }
}