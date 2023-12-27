import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import CreateLinkButton from "./_components/CreateLinkButton";
import LinkCard from "@/components/LinkCard";

const GroupIdPage = async ({ params }: { params: { groupId: string } }) => {
  const { groupId } = params;
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) return redirect("/");

  const group = await db.groups.findUnique({
    where: {
      id: groupId,
    },
    include: {
      links: true,
    },
  });
  if (!group) return notFound();

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-y-1 ml-2">
          <div className="text-3xl font-bold">{group.name}</div>
          <div className="opacity-60">
            List of all your Links in group {group.name}.
          </div>
        </div>
        <CreateLinkButton groupId={group.id} />
      </div>
      <div className="mt-10 mb-10 ml-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {group.links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
};

export default GroupIdPage;
