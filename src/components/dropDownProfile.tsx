import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BadgeCheckIcon,
  // BellIcon,
  // CreditCardIcon,
} from "lucide-react"
import LogoutButton from "./logoutButton";

export function DropdownMenuAvatar({user}: {user?: {name?: string | null; email?: string | null, image?: string | null}}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="rounded-full"><Avatar>
          <AvatarImage src={user?.image || "https://github.com/shadcn.png"} alt={user?.name || "shadcn"} />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            Signed in as <br />
            <span className="font-medium">
              {user?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
