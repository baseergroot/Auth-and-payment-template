'use client';
import { InitialStateI } from '@/actions/emailAndPassword/forgot-password';
import resetPassword from '@/actions/emailAndPassword/reset-password';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';

import React, { useActionState } from 'react'

const initialState: InitialStateI = {
  url: ""
}

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")
  const [showError, setShowError] = React.useState(!token);
  const handleResetPasswd = resetPassword.bind(null, token)
  const [state, formAction, isPending] = useActionState(handleResetPasswd, initialState);

  if (showError) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid or Missing Token</h1>
          <p className="text-red-500">The reset link is invalid or expired. Please request a new one.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form action={formAction} className="flex flex-col gap-6 bg-white border border-gray-200 rounded-lg p-8 shadow-md w-full max-w-md">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your new password below
          </p>
        </div>
        <input type="password" name='new-password' placeholder='Type new password' required className="border rounded-md px-3 py-2" />
        <Button disabled={isPending}>
          Change Password
        </Button>
        {state.message && (
          <p className={`text-center text-sm ${state.status ? 'text-green-600' : 'text-red-500'}`}>{state.message}</p>
        )}
      </form>
    </main>
  )
}

export default Page