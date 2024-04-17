import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { redis } from "@/lib/redis";

const DomainPage = async ({ params }: { params: { domain: string } }) => {
  const { domain } = params;

  const redisLink = await redis.get(`link:${domain}`);
  if (redisLink) {
    return redirect(redisLink.toString());
  }

  const shortLink = await db.shortenLink.findUnique({
    where: {
      slug: domain,
    },
  });
  if (shortLink) {
    await redis.set(`link:${domain}`, shortLink.longUrl);
    await redis.expire(`link:${domain}`, 60 * 60 * 24 * 7);
    return redirect(shortLink.longUrl);
  }

  return notFound();
};

export default DomainPage;
