import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CreateProjectButton from "./_components/CreateProjectButton";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import Actions from "./_components/Actions";

const UrlShortenerPage = async () => {
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

  const projects = await db.project.findMany({
    where: {
      userId: user.id,
    },
    include: {
      shortenLinks: true,
      user: true,
    },
  });

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-y-1 ml-2">
          <div className="text-3xl font-bold">Projects</div>
          <div className="opacity-60">All your projects at one place.</div>
        </div>
        <CreateProjectButton />
      </div>
      {projects.length > 0 ? (
        <div className="mt-10 mb-10 ml-2 flex flex-wrap justify-center gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg w-full mx-2 sm:w-[250px] border border-neutral-700 h-[150px] p-2 flex items-center flex-col justify-around"
            >
              <div className="w-full flex justify-around items-center">
                <Link
                  href={`/shortener/${project.id}`}
                  className="text-blue-400 font-bold text-2xl line-clamp-1"
                >
                  {project.name}
                </Link>
                <Actions projectId={project.id} projectName={project.name} />
              </div>
              <div className="flex gap-x-2 items-center">
                <LinkIcon className="w-5 h-5" />
                <span>
                  {project.shortenLinks.length}{" "}
                  {project.shortenLinks.length === 1 ? "link" : "links"}
                </span>
              </div>
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
    </div>
  );
};

export default UrlShortenerPage;
