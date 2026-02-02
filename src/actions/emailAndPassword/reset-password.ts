"use server"

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { redirect } from "next/navigation";

export interface ResetPasswordResponseI {
  success?: boolean
  status?: boolean
  message?: string
}

export default async function resetPassword(token: string, initialState: ResetPasswordResponseI, formData: FormData): Promise<ResetPasswordResponseI> {


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
      return {success: false}
    }
    if (error && typeof error === "object" && "message" in error && typeof (error as Record<string, unknown>).message === "string" && (error as Record<string, unknown>).message === "NEXT_REDIRECT") {
      console.log({ error });
      throw error; // Re-throw the error so Next.js can handle the redirect
    }
    console.log({ error });
    return {success: false}

  }
}