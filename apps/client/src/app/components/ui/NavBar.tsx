"use client";

import { navBarButtons } from "@/data/nav-bar-buttonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();
    return (
        <nav className="flex flex-col gap-5 w-full text-gray-700">
            {navBarButtons.map((btn) => {
                const isActive = pathname === btn.link;
                return (
                    <Link
                        key={btn.text}
                        href={btn.link}
                        className={`
                            flex flex-row gap-2 items-center px-3 py-2 border-2 border-gray-200 transition-colors duration-200
                            hover:border-red-400 hover:text-red-400
                            ${isActive ? "border-red-400/70 text-red-400/70 font-semibold" : ""}
                            `}
                    >
                        {btn.icon} {btn.text}
                    </Link>
                );
            })}
        </nav>
    );
}