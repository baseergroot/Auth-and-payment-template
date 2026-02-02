

import ResetPasswordComp from '@/components/resetPassword'
import { Suspense } from 'react'

 
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string}>
}) {
  const params = await searchParams
  const token = params.token

  if (!token) {
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
    <Suspense fallback={<main className='w-screen h-screen flex items-center justify-center'>Loading....</main>}>
      <ResetPasswordComp token={token} />
    </Suspense>
  )
}