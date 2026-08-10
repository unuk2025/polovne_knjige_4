import { redirect } from "next/navigation";

import { currentUser } from "@/lib/user";

export default function KorpaPage() {
    if (currentUser.status !== "kupac") {
        redirect("/");
    }

    return (
        <main className="mx-auto max-w-6xl p-8">
            <h1 className="text-3xl font-bold">
                Sada ste u korpi
            </h1>
        </main>
    );
}
