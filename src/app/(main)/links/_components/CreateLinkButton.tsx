"use client";

import { Button } from "@/components/ui/button";
import { useCreateLinkModal } from "@/hooks/use-createlink-modal";

const CreateLinkButton = () => {
  const { onOpen } = useCreateLinkModal();
  const id = "";

  const handleClick = () => {
    onOpen(id);
  };

  return (
    <Button className="mx-2 mt-4" onClick={handleClick}>
      Create Link
    </Button>
  );
};

export default CreateLinkButton;
