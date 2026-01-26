"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function cancelSubscription() {


  const data = await auth.api.cancelSubscription({
    body: {
      returnUrl: '/', // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  console.log({data});
  return data;
  
}