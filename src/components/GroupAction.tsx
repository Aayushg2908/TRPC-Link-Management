"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { ElementRef, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./ui/popover";
import { Groups, Links } from "@prisma/client";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const GroupAction = ({ group }: { group: Groups & { links: Links[] } }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { mutateAsync: deleteGroup, isLoading: isGroupDeleteLoading } =
    trpc.group.deleteGroup.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Group deleted successfully");
          closeRef.current?.click();
          router.refresh();
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutateAsync: deleteAllLinks, isLoading: isDeletingAllLinks } =
    trpc.group.deleteAllLinks.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Links deleted successfully");
          closeRef.current?.click();
          router.refresh();
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDeleteGroup = async () => {
    await deleteGroup({ id: group.id });
  };

  const handleDeleteLinks = async () => {
    await deleteAllLinks({ id: group.id });
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
      <PopoverContent className="w-[200px]">
        <div className="p-2 flex flex-col justify-center items-center gap-y-4">
          <Button
            disabled={isGroupDeleteLoading}
            onClick={handleDeleteGroup}
            variant="ghost"
          >
            Delete Group
          </Button>
          <Button
            disabled={isDeletingAllLinks}
            onClick={handleDeleteLinks}
            variant="ghost"
          >
            Delete all Links
          </Button>
        </div>
        <PopoverClose ref={closeRef} />
      </PopoverContent>
    </Popover>
  );
};

export default GroupAction;
