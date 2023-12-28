"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <SignOutButton signOutCallback={() => router.push("/")}>
      <Button>Sign Out</Button>
    </SignOutButton>
  );
};

export default LogoutButton;
