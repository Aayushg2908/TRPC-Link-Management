"use client";

import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinksColumn } from "./link-columns";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GroupsColumn } from "./group-columns";

interface Props {
  data: GroupsColumn;
}

const GroupCellAction = ({ data }: Props) => {
  const router = useRouter();

  const { mutateAsync: deleteLink, isLoading } =
    trpc.group.deleteGroup.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Group deleted successfully");
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
          router.refresh();
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Button
          onClick={async () => {
            await deleteLink({ id: data.id });
          }}
          variant="ghost"
          className="w-full"
          disabled={isLoading}
        >
          Delete Group
        </Button>
        <Button
          onClick={async () => {
            await deleteAllLinks({ id: data.id });
          }}
          variant="ghost"
          className="w-full"
          disabled={isDeletingAllLinks}
        >
          Delete all links
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupCellAction;
