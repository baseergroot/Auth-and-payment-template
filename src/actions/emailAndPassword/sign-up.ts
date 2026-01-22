"use server"
import { auth } from "@/lib/auth";
import { BetterAuthError } from "better-auth";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(30, "Name must be at most 30 characters long"),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be at most 20 characters long"),
})

interface ISchemaError {
  name?: string;
  email?: string;
  password?: string;
}

export interface IResponse {
  success: boolean
  errors?: ISchemaError
  message?: string
  userCreated?: boolean
  betterAuthError?: string
  error?: string
  credentialsError?: boolean
  redirectUrl?: string
}

export default async function signUp(initialState: IResponse, formData: FormData): Promise<IResponse> {

  const { name, email, password } = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  const schemaResponse = signupSchema.safeParse({ name, email, password })

  // console.log({ schemaResponse })

  if (!schemaResponse.success) {
    // console.log({ schemaResponseError: schemaResponse });

    const schemaError: ISchemaError = {}

    schemaResponse.error.issues.forEach(issue => {
      type ErrorFields = 'name' | 'email' | 'password'
      const fieldName = issue.path[0] as ErrorFields
      schemaError[fieldName] = issue.message
    })

    return { success: false, errors: schemaError };
  }

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: `${process.env.BETTER_AUTH_URL}`
      },
    });

    console.log({ response });
    if (response.user) {
      return { success: true, message: "User created successfully", userCreated: true, redirectUrl: `${process.env.BETTER_AUTH_URL}/signup/verify-email` }
    }

     return { success: false, message: "Error While Creating User", userCreated: false }
  } catch (error: unknown) {
    if (error instanceof BetterAuthError) {
      console.log({ betterAuthCatch: error });
      return { success: false, betterAuthError: "error" }
    }
    console.log({ error });
    return { success: false, error: "error" }
  }
} 