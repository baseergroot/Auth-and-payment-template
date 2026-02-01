"use server"
import { auth } from "@/lib/auth";
import { APIError, BetterAuthError } from "better-auth";
import { z } from "zod";
import { IResponse } from "./sign-up";

const signupSchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be at most 20 characters long"),
})

export default async function signIn(initialState: IResponse, formData: FormData) {

  const { email, password } = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  const schemaResponse = signupSchema.safeParse({ email, password })

  console.log({ schemaResponse })

  if (!schemaResponse.success) {
    console.log({ schemaResponseError: schemaResponse });

    const schemaError: {
      name?: string;
      email?: string;
      password?: string;
    } = {}

    schemaResponse.error.issues.forEach(issue => {
      type ErrorFields = 'email' | 'password'
      const fieldName = issue.path[0] as ErrorFields
      schemaError[fieldName] = issue.message
    })

    return { success: false, errors: schemaError };   // ZodError instance
  }


  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "http://localhost:3000",
      },
    });

    console.log({ response });

    if (response.user) {
      console.log("logged in")

      return { success: true, message: "User signed in successfully", userCreated: true, redirectUrl: response.url }
    }

    return { success: true, message: "Invalid credentials", credentialsError: true }
    
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.log({ betterAuthCatch: error });
      return { success: false, message: "Invalid credentials", credentialsError: true }
    }
    console.log({ error });
    return { success: false, error: "something went wrong! try again" }
  }
}