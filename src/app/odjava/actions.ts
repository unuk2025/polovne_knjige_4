"use server";

import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function odjaviKorisnika() {
    await deleteSession();
    redirect("/prijava");
}
