"use client";

import { Button } from "@/components/ui/button";
import { useShortenLinkModal } from "@/hooks/use-shortenlink-modal";

const CreateShortenedLink = () => {
  const { open } = useShortenLinkModal();

  return (
    <Button className="mx-2 mt-4" onClick={() => open("CREATE")}>
      Shorten a Link
    </Button>
  );
};

export default CreateShortenedLink;
