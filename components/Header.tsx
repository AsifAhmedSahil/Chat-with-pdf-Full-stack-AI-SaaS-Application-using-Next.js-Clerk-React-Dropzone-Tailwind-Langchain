import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {FilePlus2} from "lucide-react"

const Header = () => {
  return (
    <div className="flex justify-between p-5 bg-white border-b shadow-sm">
      <Link href="/dashboard" className="text-2xl">
        Chat To <span className="text-indigo-600">PDF</span>
      </Link>

      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild  variant="link" className="hidden md:flex">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild  variant="outline" >
            <Link href="/dashboard">My Document</Link>
          </Button>

          <Button asChild  variant="outline" >
            <Link href="/dashboard/upload">
                <FilePlus2 className="text-indigo-600"/>
            </Link>
          </Button>

          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
