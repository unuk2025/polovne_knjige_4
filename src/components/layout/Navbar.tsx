import Link from "next/link";

import { currentUser } from "@/lib/user";

export default function Navbar() {
    return (
        <nav className="mb-8 flex gap-4 rounded-lg border border-gray-300 bg-slate-100 p-4">
            <Link
                href="/"
                className="font-medium hover:underline"
            >
                Početna
            </Link>

            <Link
                href="/katalog"
                className="font-medium hover:underline"
            >
                Katalog
            </Link>

            {currentUser.status === "kupac" && (
                <Link
                    href="/korpa"
                    className="font-medium hover:underline"
                >
                    Korpa
                </Link>
            )}

            {currentUser.status === "administrator" && (
                <Link
                    href="/baza"
                    className="font-medium hover:underline"
                >
                    Baza
                </Link>
            )}
        </nav>
    );
}