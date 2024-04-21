import { db } from "@/lib/db";
import CreateLinkButton from "./_components/CreateLinkButton";
import LinkCard from "@/components/LinkCard";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Wrapper from "@/components/Wrapper";

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

    <Wrapper Heading="Links" subHeading="All your links at one place." createButton={<CreateLinkButton />} >
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
    </Wrapper>
  );
};

export default LinksPage;
