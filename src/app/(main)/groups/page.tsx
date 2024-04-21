import CreateGroupButton from "./_components/CreateGroupButton";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import GroupCard from "@/components/GroupCard";
import Wrapper from "@/components/Wrapper";

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
      links: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (

    <Wrapper Heading="Groups" subHeading="List of all your Groups in one place." createButton={<CreateGroupButton />} >
      {groups.length > 0 ? (
        <div className="mt-10 mb-10 ml-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center text-muted-foreground">
          <div>No Groups!!</div>
          <div>
            Oops! Looks like you don&apos;t have any groups created. You should
            create some.
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default GroupsPage;
