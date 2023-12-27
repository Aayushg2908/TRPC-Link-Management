import { Groups, Links } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GroupAction from "./GroupAction";
import GroupImageButton from "./GroupImageButton";

interface GroupCardProps {
  group: Groups & { links: Links[] };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <div className="my-2 w-full border border-1 h-[400px]">
      <div className="flex flex-col gap-y-2 p-4">
        <Link href={`group/${group.id}`}>
          {group.image ? (
            <Image
              src={group.image}
              alt="linkLogo"
              width={200}
              height={250}
              className="w-full h-[250px] rounded-md"
            />
          ) : (
            <div className="w-full h-[250px] rounded-lg bg-gray-300 dark:bg-gray-700" />
          )}
        </Link>
        <div className="mt-2 w-full flex items-start justify-between">
          <div className="flex flex-col justify-between gap-y-3">
            <div className="text-lg font-semibold">{group.name}</div>
            <div className="flex flex-col text-muted-foreground text-sm">
              <div>Link Count: {group.links.length}</div>
              <div>Created at: {formatDate(group.createdAt)}</div>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <GroupImageButton id={group.id} />
            <GroupAction group={group} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
