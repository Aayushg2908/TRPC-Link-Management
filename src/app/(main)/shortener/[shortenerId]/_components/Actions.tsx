"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShortenLinkModal } from "@/hooks/use-shortenlink-modal";
import { CircleEllipsis, Copy, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Actions = ({
  url,
  slug,
  id,
}: {
  url: string;
  slug: string;
  id: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { open } = useShortenLinkModal();
  const router = useRouter();

  const { mutateAsync: deleteShortLink } =
    trpc.link.deleteShortLink.useMutation({
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Short link deleted successfully");
          router.refresh();
        }
      },
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteShortLink(id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <CircleEllipsis className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => {
            window.navigator.clipboard.writeText(
              `trpc-link-management.vercel.app/${slug}`
            );
            toast.success("Copied to clipboard");
          }}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-x-1">
            <Copy className="w-5 h-5" />
            Copy
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => open("EDIT", id, slug, url)}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-x-1">
            <Edit className="w-5 h-5" />
            Edit
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleDelete} className="cursor-pointer">
          <div className="flex items-center gap-x-1">
            <Trash2 className="w-5 h-5" />
            Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
