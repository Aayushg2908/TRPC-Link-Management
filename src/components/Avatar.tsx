"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LinkIcon, LayoutDashboard, Group } from "lucide-react";
import { trpc } from "@/app/_trpc/client";

const Avatars = () => {
  const router = useRouter();
  const { data: user } = trpc.user.currentUser.useQuery();
  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user.photo} alt="ProfileLogo" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex flex-col md:flex-row justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">
                {user?.username}
              </span>
              <span className="font-sm opacity-50 tracking-tight">
                {user.email}
              </span>
            </div>
            <SignOutButton signOutCallback={() => router.push("/")}>
              <Button>Sign Out</Button>
            </SignOutButton>
          </div>
          <Link href="/links" className="flex gap-x-2">
            <LinkIcon className="text-purple-600" />
            Links
          </Link>
          <Link href="/groups" className="flex gap-x-2">
            <Group className="text-purple-600" />
            Groups
          </Link>
          <Link href="/dashboard" className="flex gap-x-2">
            <LayoutDashboard className="text-purple-600" />
            Dashboard
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Avatars;
