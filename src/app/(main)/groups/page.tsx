import React from "react";
import CreateGroupButton from "./_components/CreateGroupButton";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import GroupCard from "@/components/GroupCard";

const GroupsPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) return redirect("/");

  const groups = await db.groups.findMany({
    where: {
      userId: user.id,
    },
    include: {
      links: true
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-y-1 ml-2">
          <div className="text-3xl font-bold">Groups</div>
          <div className="opacity-60">
            List of all your Groups in one place.
          </div>
        </div>
        <CreateGroupButton />
      </div>
      <div className="mt-10 mb-10 ml-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
