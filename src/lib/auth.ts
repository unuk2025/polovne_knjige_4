import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";

export async function login(
    korisnickoIme: string,
    lozinka: string
): Promise<boolean> {
    const korisnik = await prisma.korisnik.findUnique({
        where: {
            korisnicko_ime: korisnickoIme,
        },
    });

    if (!korisnik) {
        return false;
    }

    const ispravnaLozinka = await verifyPassword(
        lozinka,
        korisnik.lozinka
    );

    if (!ispravnaLozinka) {
        return false;
    }

    await createSession(korisnik.korisnik_id);

    return true;
}

export async function logout(): Promise<void> {
    await deleteSession();
}