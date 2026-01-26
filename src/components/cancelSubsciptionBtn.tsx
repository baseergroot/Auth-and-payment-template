"use client"
import { useTransition } from 'react'
import { Button } from './ui/button'
import cancelSubscription from '@/actions/subscription/cancel'

const CancelSubsciptionBtn = () => {
  const [isPending, startTransition] = useTransition()

  const handelCancel = () => {
    startTransition(async () => {
      const res = await cancelSubscription()
      console.log({res});
      if (res?.url) {
        window.location.href = res.url
      }
    })
  }
  return (
    <Button onClick={handelCancel} disabled={isPending}>
      Cancel Subscription
    </Button>
  )
}

export default CancelSubsciptionBtn