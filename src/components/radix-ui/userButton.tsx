"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/radix-ui/dropdown-menu";
import { User } from "@/lib/types";
// import { useClerk } from "@clerk/clerk-react";
import { LogOut, Pencil, Sparkles } from "lucide-react";

export default function UserButton({ userData }: { userData: User }) {
  if (!userData) return null;

  // const { signOut } = useClerk();
  // const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-9 h-9 font-mono rounded-full overflow-hidden bg-gradient-to-t from-neutral-800 to-neutral-600 flex items-center justify-center text-sm font-medium">
          {userData.name &&
            userData.name
              .split(" ")
              .slice(0, 2)
              .map((name) => name[0].toUpperCase())}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <div className="py-1.5 px-2 w-full">
          <div className="font-medium">{userData.name}</div>
          <div className="text-sm w-full overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
            {userData.email}
          </div>
        </div>

        <DropdownMenuSeparator />
        <div className="py-1.5 px-2 w-full flex flex-col items-start text-sm">
          <div className="flex items-center">
            <Sparkles className={`h-4 w-4 mr-2 text-indigo-500`} />
            AI Usage: {userData.generations}/10
          </div>
          <div className="rounded-full w-full mt-2 h-2 overflow-hidden bg-secondary">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{
                width: `${(userData.generations * 100) / 10}%`,
              }}
            />
          </div>
        </div>
        <DropdownMenuSeparator />

        {/* <DropdownMenuItem className="cursor-pointer">
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit Profile</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          // onClick={() => signOut(() => {/** router.push("/")  */})}
          className="!text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
