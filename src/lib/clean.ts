// src/lib/clean.ts

import prisma from "@/lib/prisma";
import type { ActionResult } from "@/lib/types";

export async function runClean(): Promise<ActionResult> {
    try {
        await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0");

        await prisma.$transaction([
            prisma.dodata.deleteMany(),
            prisma.slika_uzorak.deleteMany(),
            prisma.porudzbina.deleteMany(),
            prisma.knjiga.deleteMany(),
            prisma.korisnik.deleteMany(),
            prisma.autor.deleteMany(),
            prisma.izdavac.deleteMany(),
            prisma.zanr.deleteMany(),
        ]);

        await prisma.$executeRawUnsafe("ALTER TABLE autor AUTO_INCREMENT = 1");
        await prisma.$executeRawUnsafe("ALTER TABLE izdavac AUTO_INCREMENT = 1");
        await prisma.$executeRawUnsafe("ALTER TABLE zanr AUTO_INCREMENT = 1");
        await prisma.$executeRawUnsafe("ALTER TABLE korisnik AUTO_INCREMENT = 1");
        await prisma.$executeRawUnsafe("ALTER TABLE knjiga AUTO_INCREMENT = 1");
        await prisma.$executeRawUnsafe("ALTER TABLE porudzbina AUTO_INCREMENT = 1");
        await prisma.$executeRawUnsafe("ALTER TABLE slika_uzorak AUTO_INCREMENT = 1");

        await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1");

        console.log("Baza je uspešno očišćena.");

        return {
            success: true,
            message: "Baza je uspešno očišćena.",
        };
    } catch (error) {
        try {
            await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1");
        } catch {
            // Ignoriši eventualnu grešku pri ponovnom uključivanju FK provera.
        }

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Došlo je do greške.",
        };
    } finally {

    }
}