import { ChevronDown } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logOut from "@/lib/supabase/auth/logout";

import Link from "next/link";

const ProfileDropdown = ({ userInfo }) => {
  const userInitials = "JS";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3">
          <Avatar className="h-11 w-11">
            {/* Initials */}
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              {userInitials}
            </div>
          </Avatar>

          {/* user info */}
          <div className="max-[390px]:hidden">
            {/* Name */}
            <p className="max-w-[100px] truncate font-semibold">{"John Doe"}</p>

            {/* Role */}
            <p className="text-sm">{"Admin"}</p>
          </div>

          <ChevronDown size={22} />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[165px]" sideOffset={10}>
        <DropdownMenuItem asChild disabled>
          <Link href="/account" disabled>
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          className="!text-red-700 focus:!bg-red-100 dark:!text-red-300 dark:focus:!bg-accent"
          onClick={() => logOut()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
