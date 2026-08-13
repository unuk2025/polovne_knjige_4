import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

export default async function KorpaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();

    if (currentUser?.uloga !== "kupac") {
        redirect("/");
    }

    return children;
}
