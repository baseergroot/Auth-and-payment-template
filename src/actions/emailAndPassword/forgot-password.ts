"use server"
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";

export interface InitialStateI {
  url: string
}
export default async function forgotPassword( initialState: InitialStateI, formData: FormData) {
  console.log({email: formData.get("email")});
  
  try {
    const forgotPasswordResponse = await auth.api.requestPasswordReset({
      body: {
        email: formData.get("email") as string, 
        redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`,
      }
    })
    console.log({ forgotPasswordResponse });
    return forgotPasswordResponse
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.log({ApiError: error});
      return error
    }
    console.log({errorDefault: error});
    return error
  }
}