import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { LinkIcon, LayoutDashboard, Group, Loader2 } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { currentUser } from "@clerk/nextjs";

const Avatars = async () => {
  const user = await currentUser();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="ProfileLogo" />
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
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
            <LogoutButton />
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
          <Link href="/shortener" className="flex gap-x-2">
            <LinkIcon className="text-purple-600" />
            URL Shortener
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Avatars;
