import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";

import prisma from "@/lib/prisma";

const SESSION_COOKIE = "session_token";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 dana

export async function createSession(korisnikId: number) {
    const token = randomBytes(32).toString("hex");

    const istice = new Date(Date.now() + SESSION_DURATION_MS);

    await prisma.sesija.create({
        data: {
            token,
            korisnik_id: korisnikId,
            istice,
        },
    });

    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: istice,
        path: "/",
    });
}

export async function getCurrentUser() {
    const cookieStore = await cookies();

    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (!token) {
        return null;
    }

    const sesija = await prisma.sesija.findUnique({
        where: {
            token,
        },
        include: {
            korisnik: true,
        },
    });

    if (!sesija) {
        return null;
    }

    if (sesija.istice <= new Date()) {
        await prisma.sesija.delete({
            where: {
                sesija_id: sesija.sesija_id,
            },
        });

        cookieStore.delete(SESSION_COOKIE);

        return null;
    }

    return sesija.korisnik;
}

export async function deleteSession() {
    const cookieStore = await cookies();

    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (token) {
        await prisma.sesija.deleteMany({
            where: {
                token,
            },
        });
    }

    cookieStore.delete(SESSION_COOKIE);
}