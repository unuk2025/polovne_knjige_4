// src/lib/seed.ts

import prisma from "@/lib/prisma";
import { korisnik_uloga } from "../generisano/prisma/enums";
import { mkdir, access, writeFile } from "node:fs/promises";
import path from "node:path";
import { constants } from "node:fs";
import type { ActionResult } from "@/lib/types";


const PUBLIC_DIR = path.join(process.cwd(), "public");
const SLIKE_DIR = path.join(PUBLIC_DIR, "slike");
const KNJIGE_DIR = path.join(SLIKE_DIR, "knjige");


async function ensureDirectory(dir: string) {
    try {
        await access(dir, constants.F_OK);
    } catch {
        await mkdir(dir, { recursive: true });
    }
}


async function createPlaceholderImage(filePath: string) {
    try {
        await access(filePath, constants.F_OK);
    } catch {
        await writeFile(filePath, "");
    }
}

async function ensureDatabaseIsEmpty() {

    const [
        brojAutora,
        brojIzdavaca,
        brojZanrova,
        brojKorisnika,
        brojKnjiga,
        brojPorudzbina,
        brojDodatih,
        brojSlika
    ] = await Promise.all([
        prisma.autor.count(),
        prisma.izdavac.count(),
        prisma.zanr.count(),
        prisma.korisnik.count(),
        prisma.knjiga.count(),
        prisma.porudzbina.count(),
        prisma.dodata.count(),
        prisma.slika_uzorak.count()
    ]);

    if (
        brojAutora > 0 ||
        brojIzdavaca > 0 ||
        brojZanrova > 0 ||
        brojKorisnika > 0 ||
        brojKnjiga > 0 ||
        brojPorudzbina > 0 ||
        brojDodatih > 0 ||
        brojSlika > 0
    ) {
        throw new Error(
            "Baza nije prazna. Inicijalizacija je prekinuta."
        );
    }
}

export async function runSeed(): Promise<ActionResult> {

    try {

        await ensureDatabaseIsEmpty();

        //----------------------------------------------------------
        // Kreiranje direktorijuma
        //----------------------------------------------------------

        await ensureDirectory(PUBLIC_DIR);
        await ensureDirectory(SLIKE_DIR);
        await ensureDirectory(KNJIGE_DIR);


        //----------------------------------------------------------
        // Žanrovi
        //----------------------------------------------------------

        const zanrovi = await Promise.all([
            prisma.zanr.create({
                data: {
                    naziv_zanra: "Roman"
                }
            }),

            prisma.zanr.create({
                data: {
                    naziv_zanra: "Fantastika"
                }
            }),

            prisma.zanr.create({
                data: {
                    naziv_zanra: "Drama"
                }
            }),

            prisma.zanr.create({
                data: {
                    naziv_zanra: "Istorija"
                }
            }),

            prisma.zanr.create({
                data: {
                    naziv_zanra: "Psihologija"
                }
            })
        ]);


        //----------------------------------------------------------
        // Izdavači
        //----------------------------------------------------------

        const izdavaci = await Promise.all([
            prisma.izdavac.create({
                data: {
                    naziv_izdavaca: "Laguna",
                    grad: "Beograd"
                }
            }),

            prisma.izdavac.create({
                data: {
                    naziv_izdavaca: "Vulkan",
                    grad: "Beograd"
                }
            }),

            prisma.izdavac.create({
                data: {
                    naziv_izdavaca: "Dereta",
                    grad: "Beograd"
                }
            })
        ]);


        //----------------------------------------------------------
        // Autori
        //----------------------------------------------------------

        const autori = await Promise.all([
            prisma.autor.create({
                data: {
                    ime_autora: "Ivo",
                    prezime_autora: "Andrić",
                    zemlja_autora: "Srbija"
                }
            }),

            prisma.autor.create({
                data: {
                    ime_autora: "Mesa",
                    prezime_autora: "Selimović",
                    zemlja_autora: "BiH"
                }
            }),

            prisma.autor.create({
                data: {
                    ime_autora: "George",
                    prezime_autora: "Orwell",
                    zemlja_autora: "Velika Britanija"
                }
            }),

            prisma.autor.create({
                data: {
                    ime_autora: "Jules",
                    prezime_autora: "Verne",
                    zemlja_autora: "Francuska"
                }
            }),

            prisma.autor.create({
                data: {
                    ime_autora: "Fyodor",
                    prezime_autora: "Dostoevsky",
                    zemlja_autora: "Rusija"
                }
            })
        ]);


        //----------------------------------------------------------
        // Korisnici
        //----------------------------------------------------------

        await prisma.korisnik.createMany({
            data: [
                {
                    korisnicko_ime: "admin",
                    email: "admin@test.rs",
                    lozinka: "admin123",
                    uloga: korisnik_uloga.administrator
                },

                {
                    korisnicko_ime: "pera",
                    email: "pera@test.rs",
                    lozinka: "pera123",
                    uloga: korisnik_uloga.prodavac
                },

                {
                    korisnicko_ime: "mika",
                    email: "mika@test.rs",
                    lozinka: "mika123",
                    uloga: korisnik_uloga.kupac
                }
            ]
        });


        //----------------------------------------------------------
        // Knjige
        //----------------------------------------------------------

        const knjige = [
            {
                isbn: "9788600000001",
                naslov: "Na Drini ćuprija",
                autor: autori[0],
                zanr: zanrovi[0],
                izdavac: izdavaci[0]
            },

            {
                isbn: "9788600000002",
                naslov: "Derviš i smrt",
                autor: autori[1],
                zanr: zanrovi[2],
                izdavac: izdavaci[1]
            },

            {
                isbn: "9788600000003",
                naslov: "1984",
                autor: autori[2],
                zanr: zanrovi[1],
                izdavac: izdavaci[2]
            },

            {
                isbn: "9788600000004",
                naslov: "Put oko sveta za 80 dana",
                autor: autori[3],
                zanr: zanrovi[1],
                izdavac: izdavaci[0]
            },

            {
                isbn: "9788600000005",
                naslov: "Zločin i kazna",
                autor: autori[4],
                zanr: zanrovi[0],
                izdavac: izdavaci[1]
            }
        ];


        for (const knjiga of knjige) {

            const folder = path.join(KNJIGE_DIR, knjiga.isbn);

            await ensureDirectory(folder);


            const createdBook = await prisma.knjiga.create({
                data: {
                    isbn: knjiga.isbn,
                    naslov: knjiga.naslov,
                    cena: 1200,
                    broj_strana: 350,
                    godina_izdavanja: 2020,
                    povez: "Tvrd",
                    pismo: "Latinica",
                    opis: `Primer knjige: ${knjiga.naslov}`,
                    slika_korice:
                        `/slike/knjige/${knjiga.isbn}/naslovna.jpg`,
                    autor_id: knjiga.autor.autor_id,
                    zanr_id: knjiga.zanr.zanr_id,
                    izdavac_id: knjiga.izdavac.izdavac_id
                }
            });


            await createPlaceholderImage(
                path.join(folder, "naslovna.jpg")
            );


            const brojSlika = 3 + Math.floor(Math.random() * 3);


            for (let i = 1; i <= brojSlika; i++) {

                const naziv =
                    `${String(i).padStart(2, "0")}.jpg`;


                await createPlaceholderImage(
                    path.join(folder, naziv)
                );


                await prisma.slika_uzorak.create({
                    data: {
                        naziv_slike: `Uzorak ${i}`,
                        link_slike:
                            `/slike/knjige/${createdBook.isbn}/${naziv}`,
                        isbn: createdBook.isbn
                    }
                });
            }
        }

        console.log("Seed uspešno završen.");

        return {
            success: true,
            message: "Seed uspešno završen."
        };

    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Došlo je do greške."
        };
    }
   
    finally {

    }
}

