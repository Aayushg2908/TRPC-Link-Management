"use client";

import { Button } from "@/components/ui/button";
import { useCreateProjectModal } from "@/hooks/use-createproject-modal";

const CreateProjectButton = () => {
  const { open } = useCreateProjectModal();

  return (
    <Button className="mx-2 mt-4" onClick={() => open("CREATE")}>
      Create Project
    </Button>
  );
};

export default CreateProjectButton;
