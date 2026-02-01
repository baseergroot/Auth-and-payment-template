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
import { useActionState, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import signUp, { IResponse } from "@/actions/emailAndPassword/sign-up"
import GoogleSigninButton from "./google-signin-button"
import { useRouter } from "next/navigation"

const initialState: IResponse = {
  success: false
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  if (state.redirectUrl) {
    router.push(state.redirectUrl);
  }

  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" required />
          {
            state.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>
          }

        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          {
            state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>
          }

          {
            state.userAlreadyExist && <p className="text-red-500 text-sm">{state.message}</p>
          }

        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {state.errors?.password && <p className="text-red-500 text-sm">{state.errors.password}</p>}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <div className="relative">
            <Input
              id="confirm-password"
              name="confirm-password"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {/* <FieldDescription>Please confirm your password.</FieldDescription> */}
          {state.passwordMismatchError && <p className="text-red-500 text-sm">{state.message}</p>}
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>Create Account</Button>
          {
            state.userCreated && <p className="text-center text-green-500">User created successfully</p>
          }
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <GoogleSigninButton />
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
