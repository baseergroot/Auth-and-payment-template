"use server"
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";


export interface ForgotPasswordResponseI {
  success: boolean
  status?: boolean
  message?: string
}
export default async function forgotPassword( initialState: ForgotPasswordResponseI, formData: FormData): Promise<ForgotPasswordResponseI> {
  console.log({email: formData.get("email")});
  
  try {
    const forgotPasswordResponse = await auth.api.requestPasswordReset({
      body: {
        email: formData.get("email") as string, 
        redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`,
      }
    })
    console.log({ forgotPasswordResponse });
    return {success: true, status: forgotPasswordResponse.status, message: forgotPasswordResponse.message}
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.log({ApiError: error});
      return {success: false}
    }
    console.log({errorDefault: error});
    return {success: false}
  }
}