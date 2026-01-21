"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useActionState } from "react"
import { IResponse } from "@/actions/emailAndPassword/sign-up"
import signIn from "@/actions/emailAndPassword/sign-in"
import GoogleSigninButton from "./google-signin-button"
import { useRouter } from "next/navigation"

const initialState: IResponse = {
  success: false
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const router = useRouter();

  if (state.redirectUrl) {
    router.push(state.redirectUrl);
  }
  
  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          {
            state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>
          }
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
          {
            state.errors?.password && <p className="text-red-500 text-sm">{state.errors.password}</p>
          }
          {
            state.credentialsError && <p className="text-start text-red-500">{state.message}</p>
          }
        </Field>
        <Field>
          <Button disabled={isPending} type="submit">Login</Button>
          {
            state.userCreated && <p className="text-center text-green-500">{state.message}</p>
          }
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <GoogleSigninButton />
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
