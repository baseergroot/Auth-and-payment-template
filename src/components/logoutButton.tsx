"use client"
import { useTransition } from "react";
import { Button } from "./ui/button";
import logOut from "@/actions/logout";
import { useRouter } from "next/navigation";


export default function LogoutButton() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition( async () => {
      const logoutRes = await logOut()
      if (logoutRes.success) {
        router.refresh()
      }
    })
  }

  return (
    <Button disabled={isPending} onClick={handleLogout}>Logout</Button>
  )
}
