import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

export default async function BazaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();

    if (currentUser?.uloga !== "administrator") {
        redirect("/");
    }

    return children;
}
