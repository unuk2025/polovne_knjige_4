import Link from "next/link";
import Image from "next/image";
import { getCoverImage } from "@/lib/cover";

type BookCardProps = {
    isbn: string;
    naslov: string;
    autor: string;
    zanr: string;
    izdavac: string;
    cena: number;
    slikaKorice: string | null;
};

export default async function BookCard({
    isbn,
    naslov,
    autor,
    zanr,
    izdavac,
    cena,
    slikaKorice,
}: BookCardProps) {
    const coverImage = await getCoverImage(slikaKorice);
    return (
        <Link
            href={`/knjiga/${isbn}`}
            className="block"
        >
            <article className="flex gap-6 rounded-lg border border-gray-300 bg-white p-4 shadow-sm">

                {/* Placeholder za koricu */}
                <div className="relative h-40 w-28 shrink-0 overflow-hidden rounded border">
                    <Image
                        src={coverImage}
                        alt={`Korica knjige: ${naslov}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                    />
                </div>

                {/* Osnovni podaci */}
                <div className="flex flex-col gap-2">

                    <h2 className="text-xl font-semibold">
                        {naslov}
                    </h2>

                    <p>
                        <span className="font-medium">Autor:</span>{" "}
                        {autor}
                    </p>

                    <p>
                        <span className="font-medium">Žanr:</span>{" "}
                        {zanr}
                    </p>

                    <p>
                        <span className="font-medium">Izdavač:</span>{" "}
                        {izdavac}
                    </p>

                    <p className="mt-2 text-lg font-bold text-blue-700">
                        {cena.toFixed(2)} din
                    </p>

                </div>

            </article>
        </Link>
    );
}