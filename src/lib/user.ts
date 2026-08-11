import { getCurrentUser } from "@/lib/session";
import { korisnik_uloga } from "@/generisano/prisma/enums";

export type Status = "gost" | "kupac" | "administrator";

export type User = {
    status: Status;
    korisnickoIme: string | null;
    email: string | null;
};

export async function currentUser(): Promise<User> {
    const korisnik = await getCurrentUser();

    if (!korisnik) {
        return {
            status: "gost",
            korisnickoIme: null,
            email: null,
        };
    }

    const status =
        korisnik.uloga === korisnik_uloga.administrator
            ? "administrator"
            : korisnik.uloga === korisnik_uloga.kupac
                ? "kupac"
                : "gost";

    return {
        status,
        korisnickoIme: korisnik.korisnicko_ime,
        email: korisnik.email,
    };
}