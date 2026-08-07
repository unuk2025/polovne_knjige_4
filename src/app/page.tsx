import prisma from "@/lib/prisma";
import BookCard from "@/components/knjiga/BookCard";
import Header from "@/components/layout/Header";

export default async function HomePage() {

    const knjige = await prisma.knjiga.findMany({
        take: 5,
        include: {
            autor: true,
            zanr: true,
            izdavac: true,
        },
        orderBy: {
            naslov: "asc",
        },
    });

    return (
        <main className="mx-auto max-w-6xl p-8">

            <Header status="Gost" />

            <section>

                <h2 className="mb-6 text-2xl font-semibold">
                    Nekoliko knjiga iz baze
                </h2>

                <div className="flex flex-col gap-6">

                    {knjige.map((knjiga) => (

                        <BookCard
                            key={knjiga.isbn}
                            isbn={knjiga.isbn}
                            naslov={knjiga.naslov}
                            autor={`${knjiga.autor.ime_autora} ${knjiga.autor.prezime_autora ?? ""}`.trim()}
                            zanr={knjiga.zanr.naziv_zanra}
                            izdavac={knjiga.izdavac.naziv_izdavaca}
                            cena={Number(knjiga.cena)}
                        />

                    ))}

                </div>

            </section>

        </main>
    );
}