import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import InfoCard from "./_components/InfoCard";
import { DataTable } from "@/components/ui/data-table";
import { LinksColumn, columns } from "./_components/link-columns";
import { format } from "date-fns";
import { GroupsColumn, groupColumns } from "./_components/group-columns";
import Wrapper from "@/components/Wrapper";

const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) return redirect("/");

  const links = await db.links.findMany({
    where: {
      userId: user.id,
    },
  });

  const groups = await db.groups.findMany({
    where: {
      userId: user.id,
    },
    include: {
      links: true,
    },
  });

  const numberOfLinks = links.length;
  const numberOfGroups = groups.length;
  const numberOfLinksInGroups = links.filter((link) => link.groupId).length;

  const constant = [
    {
      title: "My Link Trove",
      description: "Total links in your collection",
      value: numberOfLinks,
      link: "/links",
    },
    {
      title: "Group Collection",
      description: "Total groups in your collection",
      value: numberOfGroups,
      link: "/groups",
    },
    {
      title: "Links in Groups",
      description: "Total links in all your groups",
      value: numberOfLinksInGroups,
      link: "/groups",
    },
  ];

  const formattedLinks: LinksColumn[] = links.map((link) => ({
    id: link.id,
    link: link.url,
    createdAt: format(link.createdAt, "MMMM do, yyyy"),
  }));

  const formattedGroups: GroupsColumn[] = groups.map((group) => ({
    id: group.id,
    name: group.name,
    links: group.links.length,
  }));

  return (
    <Wrapper Heading="Dashboard" subHeading="Elevate your web links management" >
      <div className="mt-10 mb-10 ml-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {constant.map((item, index) => (
          <InfoCard
            key={index}
            title={item.title}
            description={item.description}
            value={item.value}
            link={item.link}
          />
        ))}
      </div>
      <div className="ml-2 flex flex-col gap-y-4">
        <div className="text-3xl font-bold">All your Links</div>
        <DataTable searchKey="link" columns={columns} data={formattedLinks} />
      </div>
      <div className="ml-2 flex flex-col gap-y-4">
        <div className="text-3xl font-bold">All your Groups</div>
        <DataTable
          searchKey="name"
          columns={groupColumns}
          data={formattedGroups}
        />
      </div>
    </Wrapper>
  );
};

export default DashboardPage;
