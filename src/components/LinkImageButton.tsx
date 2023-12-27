"use client"

import { ImagePlus } from "lucide-react";
import { Button } from "./ui/button";
import { useImageModal } from "@/hooks/use-image-modal";

const LinkImageButton = ({ id }: { id: string }) => {
  const { open } = useImageModal();

  return (
    <Button
      onClick={() => open(id)}
      variant="secondary"
      className="col-span-1 ml-2 flex items-center justify-center rounded-lg"
    >
      <ImagePlus className="w-8 h-6" />
    </Button>
  );
};

export default LinkImageButton;
