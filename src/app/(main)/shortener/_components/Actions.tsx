"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateProjectModal } from "@/hooks/use-createproject-modal";
import { CircleEllipsis, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Actions = ({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { open } = useCreateProjectModal();

  const { mutateAsync: deleteProject } = trpc.project.deleteProject.useMutation(
    {
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success("Project deleted successfully");
          router.refresh();
        }
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          toast.error(error.message);
        } else if (error.data?.code === "NOT_FOUND") {
          toast.error("Project not found");
        }
      },
    }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteProject(projectId);
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
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleEllipsis className="rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem
          onSelect={() => {
            open("EDIT", projectId, projectName);
          }}
          className="cursor-pointer"
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            handleDelete();
          }}
          className="cursor-pointer"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
