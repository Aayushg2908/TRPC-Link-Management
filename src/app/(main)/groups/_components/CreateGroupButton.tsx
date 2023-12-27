"use client";

import { Button } from "@/components/ui/button";
import { useCreateGroupModal } from "@/hooks/use-creategroup-modal";

const CreateGroupButton = () => {
  const { open } = useCreateGroupModal();

  const handleClick = () => {
    open();
  };

  return (
    <Button className="mx-2 mt-4" onClick={handleClick}>
      Create Group
    </Button>
  );
};

export default CreateGroupButton;
