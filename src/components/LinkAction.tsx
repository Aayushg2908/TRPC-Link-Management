"use client";

import { MoreHorizontal, Copy, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { ElementRef, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./ui/popover";
import { Links } from "@prisma/client";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const LinkAction = ({ link }: { link: Links }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { mutateAsync: deleteLink, isLoading } =
    trpc.link.deleteLink.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Link deleted successfully");
          router.refresh();
          closeRef.current?.click();
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link.url);
    toast.success("Link copied");
    closeRef.current?.click();
  };

  const handleDeleteLink = async () => {
    await deleteLink({ urlId: link.id });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger ref={closeRef}>
        <Button className="rounded-lg" variant="secondary">
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px]">
        <div className="p-2 flex flex-col justify-center items-center gap-y-4">
          <Button onClick={handleCopyLink} variant="ghost">
            <Copy className="mr-2 text-purple-600" />
            Copy Link
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleDeleteLink}
            variant="ghost"
          >
            <Trash className="mr-2 text-purple-600" />
            Delete Link
          </Button>
        </div>
        <PopoverClose ref={closeRef} />
      </PopoverContent>
    </Popover>
  );
};

export default LinkAction;
