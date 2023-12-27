import { Links } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import LinkAction from "./LinkAction";
import { ImagePlus } from "lucide-react";
import { Button } from "./ui/button";
import LinkImageButton from "./LinkImageButton";

interface LinkCardProps {
  link: Links;
}

const LinkCard = ({ link }: LinkCardProps) => {
  return (
    <div className="my-2 w-full border border-1 h-[350px]">
      <div className="flex flex-col gap-y-2 p-4">
        <Link target="_blank" href={link.url}>
          {link.image ? (
            <Image
              src={link.image}
              alt="linkLogo"
              width={200}
              height={200}
              className="w-full h-[200px] rounded-lg"
            />
          ) : (
            <div className="w-full h-[200px] rounded-lg bg-gray-300 dark:bg-gray-700" />
          )}
        </Link>
        <div className="mt-2 grid grid-cols-6 rounded-lg">
          <div className="col-span-4 flex-1 p-2 opacity-70 bg-gray-300 dark:bg-gray-700 rounded-lg">
            {link.url}
          </div>
          <LinkImageButton id={link.id} />
          <LinkAction link={link} />
        </div>
        <Button className="mt-2 w-full" variant="secondary">
          Move to Group
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
