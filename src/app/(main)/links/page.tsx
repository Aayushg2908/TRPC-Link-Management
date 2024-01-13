import { db } from "@/lib/db";
import CreateLinkButton from "./_components/CreateLinkButton";
import LinkCard from "@/components/LinkCard";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const LinksPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) {
    redirect("/");
  }

  const links = await db.links.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-y-1 ml-2">
          <div className="text-3xl font-bold">Links</div>
          <div className="opacity-60">All your links at one place.</div>
        </div>
        <CreateLinkButton />
      </div>
      {links.length > 0 ? (
        <div className="mt-10 mb-10 ml-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center text-muted-foreground">
          <div>No Links!!</div>
          <div>
            Oops! Looks like you don&apos;t have any links created. You should
            create some.
          </div>
        </div>
      )}
    </div>
  );
};

export default LinksPage;
