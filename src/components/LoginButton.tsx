"use client";

import { Button } from "@/components/ui/button";
import { useLoginModal } from "@/hooks/use-login-modal";

const LoginButton = ({
  title,
  variant,
  size,
  className,
}: {
  title: string;
  variant?: "outline";
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
  className?: string;
}) => {
  const { onOpen } = useLoginModal();

  const handleClick = () => {
    onOpen();
  };

  return (
    <Button
      className={className}
      variant={variant}
      onClick={handleClick}
      size={size}
    >
      {title}
    </Button>
  );
};

export default LoginButton;
