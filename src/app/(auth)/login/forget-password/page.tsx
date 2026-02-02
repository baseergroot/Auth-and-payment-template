"use client"
import forgotPassword, { ForgotPasswordResponseI } from '@/actions/emailAndPassword/forgot-password';
import { Button } from '@/components/ui/button'
import React, { useActionState } from 'react'

const initialState: ForgotPasswordResponseI = {
  success: false,
}


const Page = () => {
  const [state, formAction, isPending] = useActionState(forgotPassword, initialState);
  return (
    <main className="min-h-screen flex items-center justify-center">
      <form action={formAction} className="flex flex-col gap-6 bg-white border border-gray-200 rounded-lg p-8 shadow-md w-full max-w-md">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email to receive a password reset link
          </p>
        </div>
        <input type="email" name='email' placeholder="Enter email to reset password" required className="border rounded-md px-3 py-2" />
        <Button type="submit" disabled={isPending}>Submit</Button>
        {state.message && (
          <p className={`text-center text-sm ${state.status ? 'text-green-600' : 'text-red-500'}`}>{state.message}</p>
        )}
      </form>
    </main>
  )
}

export default Page