"use client"
import { useTransition } from "react";
import logOut from "@/actions/logout";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";


export default function LogoutButton() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      const logoutRes = await logOut()
      if (logoutRes.success) {
        router.refresh()
      }
    })
  }

  return (
    <DropdownMenuItem disabled={isPending} onClick={handleLogout}>
      <LogOutIcon />
      Sign Out
    </DropdownMenuItem>
    // <Button disabled={isPending} onClick={handleLogout}>Logout</Button>
  )
}
