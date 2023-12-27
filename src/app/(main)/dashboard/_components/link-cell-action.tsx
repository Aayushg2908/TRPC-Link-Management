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

interface Props {
  data: LinksColumn;
}

const LinkCellAction = ({ data }: Props) => {
  const router = useRouter();

  const { mutateAsync: deleteLink, isLoading } =
    trpc.link.deleteLink.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Link deleted successfully");
          router.refresh();
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleCopyLink = async () => {
    window.navigator.clipboard.writeText(data.link);
    toast.success("Link copied");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Button onClick={handleCopyLink} variant="ghost" className="w-full">
          Copy Link
        </Button>
        <Button
          onClick={async () => {
            await deleteLink({ urlId: data.id });
          }}
          variant="ghost"
          className="w-full"
          disabled={isLoading}
        >
          Delete Link
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkCellAction;
