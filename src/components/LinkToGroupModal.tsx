"use client";

import { useLinkToGroupModal } from "@/hooks/use-linktogroup-modal";
import { Dialog, DialogContent } from "./ui/dialog";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LinkToGroupModal = () => {
  const { linkId, isOpen, close } = useLinkToGroupModal();

  const { data: groups, isLoading } = trpc.group.allGroups.useQuery();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <div className="flex flex-col gap-y-2">
          <div className="font-semibold text-lg tracking-tight">
            Browse Groups
          </div>
          <div className="text-muted-foreground">
            Select which Group you want your links to be added to.
          </div>
          {isLoading && <Loader2 className="w-full mx-auto" />}
          {groups && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {groups.map((group, index) => (
                <GroupCard key={index} group={group} linkId={linkId} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkToGroupModal;

const GroupCard = ({
  group,
  linkId,
}: {
  group: {
    id: string;
    name: string;
    _count: { links: number };
  };
  linkId: string;
}) => {
  const { close } = useLinkToGroupModal();
  const router = useRouter();

  const { mutateAsync, isLoading } = trpc.group.addLinkToGroup.useMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Link added to group successfully");
        router.refresh();
        close();
        router.refresh();
      } else if (data.code === 400) {
        toast.error("Link already exists in the group");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClick = async () => {
    await mutateAsync({ linkId: linkId, groupId: group.id });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="secondary"
      className="h-[100px] flex flex-col rounded-lg items-center justify-center"
    >
      <div className="font-semibold">{group.name}</div>
      <div className="text-muted-foreground">
        Link Count: {group._count.links}
      </div>
    </Button>
  );
};
