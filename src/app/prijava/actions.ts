"use server";

import { redirect } from "next/navigation";

import { login } from "@/lib/auth";

export async function prijaviKorisnika(formData: FormData) {
    const korisnickoIme = formData.get("korisnickoIme");
    const lozinka = formData.get("lozinka");

    if (
        typeof korisnickoIme !== "string" ||
        typeof lozinka !== "string"
    ) {
        return;
    }

    const uspesnaPrijava = await login(korisnickoIme, lozinka);

    if (!uspesnaPrijava) {
        return;
    }

    redirect("/");
}
