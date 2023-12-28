"use client";

import { useLinkToGroupModal } from "@/hooks/use-linktogroup-modal";
import { Button } from "./ui/button";

const LinkToGroupButton = ({ id }: { id: string }) => {
  const { open } = useLinkToGroupModal();

  return (
    <Button
      onClick={() => open(id)}
      className="mt-2 w-full"
      variant="secondary"
    >
      Move to Group
    </Button>
  );
};

export default LinkToGroupButton;
