"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/aut-client';
import React from 'react'

const Page = () => {

  const handleBasic = async () => {
    const { data, error } = await authClient.subscription.upgrade({
      plan: "basic", // required
      successUrl: "http://localhost:3000", // required
      cancelUrl: "http://localhost:3000", // required
      disableRedirect: false, // required
    });

    if (error) {
      console.error("Error upgrading subscription:", error);
    }

    console.log("Checkout session created:", data);
  }
  return (
    <Button onClick={handleBasic}>
      Buy Basic
    </Button>
  )
}

export default Page