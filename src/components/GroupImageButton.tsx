"use client";

import { ImagePlus } from "lucide-react";
import { Button } from "./ui/button";
import { useImageModal } from "@/hooks/use-image-modal";

const GroupImageButton = ({ id }: { id: string }) => {
  const { open } = useImageModal();
  const type = "group";

  return (
    <Button
      onClick={() => open(id, type)}
      variant="secondary"
      className="col-span-1 mx-1 sm:ml-2 sm:mr-0 flex items-center justify-center rounded-lg"
    >
      <ImagePlus className="w-fit" />
    </Button>
  );
};

export default GroupImageButton;
