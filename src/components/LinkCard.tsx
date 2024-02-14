import { Links } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import LinkAction from "./LinkAction";
import LinkImageButton from "./LinkImageButton";
import LinkToGroupButton from "./LinkToGroupButton";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Group } from "lucide-react";

interface LinkCardProps {
  link: Links;
}

function truncate(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

const LinkCard = ({ link }: LinkCardProps) => {
  return (
    <div className="my-2 w-full border border-1 h-[350px]">
      <div className="flex flex-col gap-y-2 p-4">
        <Link target="_blank" href={link.url}>
          {link.image ? (
            <Image
              src={link.image}
              alt="linkLogo"
              width={200}
              height={200}
              className="w-full h-[200px] rounded-lg"
            />
          ) : (
            <div className="w-full h-[200px] rounded-lg bg-gray-300 dark:bg-gray-700" />
          )}
        </Link>
        <div className="mt-2 grid grid-cols-6 rounded-lg">
          <div className="hidden col-span-4 p-2 sm:flex items-center text-sm text-muted-foreground bg-gray-300 dark:bg-gray-700 rounded-lg line-clamp-1">
            {link.url}
          </div>
          <div className="sm:hidden col-span-4 p-2 flex items-center text-sm text-muted-foreground bg-gray-300 dark:bg-gray-700 rounded-lg">
            {truncate(link.url, 25)}
          </div>
          <LinkImageButton id={link.id} />
          <LinkAction link={link} />
        </div>
        <div className="flex items-center gap-x-2">
          <LinkToGroupButton id={link.id} />
          {link.groupId && (
            <Link
              className={cn("mt-2", buttonVariants())}
              href={`/group/${link.groupId}`}
            >
              View Group <Group className=" ml-1 w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
