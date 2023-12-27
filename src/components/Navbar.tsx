import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Avatars from "./Avatar";
import LoginButton from "./LoginButton";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = async () => {
  return (
    <div className="max-w-5xl mx-auto flex justify-between items-center h-14">
      <Link href="/" className="ml-2 text-2xl font-bold tracking-tight">
        LinkTab
      </Link>
      <div className="flex gap-4 sm:gap-8 mr-2 items-center">
        <SignedIn>
          <div className="hidden sm:flex text-sm opacity-70 items-center gap-8">
            <Link href="/links">Links</Link>
            <Link href="/groups">Groups</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <Avatars />
        </SignedIn>
        <ModeToggle />
        <SignedOut>
          <LoginButton title="Login" variant="outline" />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
