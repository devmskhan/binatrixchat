import { usePathname } from "next/navigation";
import Link from "next/link";
import { Authenticated } from "convex/react";
import { UserButton } from "@clerk/nextjs";

function Header() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");
    return (
        <header>
            <Link href="/dashboard" className="">
            Binatrix
            </Link>

            <div>
                <Authenticated>
                    <UserButton />
                </Authenticated>
            </div>
        </header>
    )
};

export default Header