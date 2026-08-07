import Image from "next/image";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";

type PageProps = {
    params: Promise<{
        isbn: string;
    }>;
};

export default async function BookPage({
    params,
}: PageProps) {

    const { isbn } = await params;

    const knjiga = await prisma.knjiga.findUnique({
        where: {
            isbn,
        },
        include: {
            autor: true,
            izdavac: true,
            zanr: true,
            slika_uzorak: {
                orderBy: {
                    slika_id: "asc",
                },
            },
        },
    });

    if (!knjiga) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl p-8">

            <h1 className="mb-8 text-3xl font-bold">
                {knjiga.naslov}
            </h1>

            <div className="grid grid-cols-[300px_1fr] gap-8">

                <div>

                    <Image
                        src={knjiga.slika_korice ?? "/slike/knjige/placeholder.jpg"}
                        alt={knjiga.naslov}
                        width={300}
                        height={450}
                        className="rounded border"
                    />

                </div>

                <div>

                    <p><b>Autor:</b> {knjiga.autor.ime_autora} {knjiga.autor.prezime_autora}</p>
                    <p><b>Žanr:</b> {knjiga.zanr.naziv_zanra}</p>
                    <p><b>Izdavač:</b> {knjiga.izdavac.naziv_izdavaca}</p>

                    <p className="mt-4">
                        {knjiga.opis}
                    </p>

                    <p className="mt-4"><b>Cena:</b> {knjiga.cena.toString()} din</p>

                </div>

            </div>

            <h2 className="mt-12 mb-4 text-2xl font-semibold">
                Uzorci
            </h2>

            <div className="flex flex-wrap gap-4">

                {knjiga.slika_uzorak.map((slika) => (

                    <Image
                        key={slika.slika_id}
                        src={slika.link_slike}
                        alt={slika.naziv_slike ?? ""}
                        width={140}
                        height={200}
                        className="rounded border"
                    />

                ))}

            </div>

        </main>
    );
}