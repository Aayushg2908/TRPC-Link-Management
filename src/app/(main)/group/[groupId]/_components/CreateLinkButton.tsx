"use client";

import { Button } from "@/components/ui/button";
import { useCreateLinkModal } from "@/hooks/use-createlink-modal";

const CreateLinkButton = ({ groupId }: { groupId: string }) => {
  const { onOpen } = useCreateLinkModal();

  const handleClick = () => {
    onOpen(groupId);
  };

  return (
    <Button className="mx-2 mt-4" onClick={handleClick}>
      Create Link
    </Button>
  );
};

export default CreateLinkButton;
