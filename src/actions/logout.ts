"use server"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface ILogoutResponse {
  success: boolean
}

export default async function logOut(): Promise<ILogoutResponse> {
  try {
    await auth.api.signOut({
      headers: await headers()
    })
    console.log("Log out successfully");
    return {success: true}
    
  } catch (error) {
    console.log({ success: false, error });
    return {success: false};
  }
}