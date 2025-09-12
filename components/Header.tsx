'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

function Header() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");
    return (
        <header className="flex items-center justify-between px-4 h-15 sm:px-6">
            <Link href="/dashboard" className="font-medium upper-case tracking-widest">
            Binatrix
            </Link>

            <div className="flex items-center gap-2">
                <Authenticated>
                    {!isDashboard && (
                        <Link href="/dashboard">
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                    )}
                    <UserButton />
                </Authenticated>

                <Unauthenticated>
                    <SignInButton
                    mode="modal"
                    forceRedirectUrl="/dashboard"
                    signUpFallbackRedirectUrl="/dashboard">
                        <Button variant={"outline"}>Sign In</Button>
                    </SignInButton>
                </Unauthenticated>
            </div>
        </header>
    )
};

export default Header