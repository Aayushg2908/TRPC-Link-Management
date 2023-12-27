"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLoginModal } from "@/hooks/use-login-modal";
import { LinkIcon } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const LoginModal = () => {
  const { user } = useUser();
  const { isOpen, onClose } = useLoginModal();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    onClose();
  }, [pathname]);

  if (user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <div className="flex flex-col gap-y-4 items-center">
            <div className="font-bold text-xl tracking-tighter">
              You are already logged in
            </div>
            <Link
              className={cn(
                buttonVariants({
                  className: "w-full",
                })
              )}
              href="/links"
            >
              Continue
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex flex-col gap-y-4 items-center">
          <LinkIcon className="h-10 w-10 text-purple-600" />
          <div className="font-bold text-2xl">Sign in to your account</div>
          <div className="opacity-60">
            Login to LinkTab - we're happy to see you!
          </div>
          <SignInButton afterSignInUrl="/">
            <Button className="w-full mt-2">Continue to Login</Button>
          </SignInButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
