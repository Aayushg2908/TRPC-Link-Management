import { db } from "@/lib/db";
import CreateShortenedLink from "./_components/CreateShortenedLink";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import Actions from "./_components/Actions";
import Wrapper from "@/components/Wrapper";

const ShortenerPage = async ({
  params,
}: {
  params: { shortenerId: string };
}) => {
  const { shortenerId } = params;
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });
  if (!user) {
    return redirect("/sign-in");
  }

  const project = await db.project.findUnique({
    where: {
      id: shortenerId,
      userId: user.id,
    },
    include: {
      shortenLinks: true,
    },
  });
  if (!project) {
    return notFound();
  }

  return (
    <Wrapper Heading={project.name} subHeading="All your shortened links at one place." createButton={<CreateShortenedLink />} >
      {project.shortenLinks.length > 0 ? (
        <div className="mt-10 mb-10 mx-auto flex flex-col gap-y-2 items-center max-w-3xl px-2">
          {project.shortenLinks.map((shortenLink) => (
            <div
              key={shortenLink.id}
              className="rounded-xl w-full p-2 h-[70px] border border-neutral-700 flex items-center justify-between"
            >
              <div className="flex gap-x-2 sm:gap-x-4 items-center">
                <LinkIcon className="ml-1 text-purple-500" />
                <div className="flex flex-col gap-y-0.5">
                  <Link
                    href={shortenLink.longUrl}
                    target="_blank"
                    className="text-blue-400 max-sm:max-w-[250px] truncate"
                  >
                    {shortenLink.longUrl}
                  </Link>
                  <Link
                    target="_blank"
                    href={`http://trpc-link-management.vercel.app/${shortenLink.slug}`}
                  >
                    trpc-link-management.vercel.app/{shortenLink.slug}
                  </Link>
                </div>
              </div>
              <Actions
                url={shortenLink.longUrl}
                slug={shortenLink.slug}
                id={shortenLink.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center text-muted-foreground">
          <div>No Projects!!</div>
          <div>
            Oops! Looks like you don&apos;t have any project created. You should
            create some.
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ShortenerPage;
