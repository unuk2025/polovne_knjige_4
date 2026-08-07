import Link from "next/link";

type BookCardProps = {
    isbn: string;
    naslov: string;
    autor: string;
    zanr: string;
    izdavac: string;
    cena: number;
};

export default function BookCard({
    isbn,
    naslov,
    autor,
    zanr,
    izdavac,
    cena,
}: BookCardProps) {
    return (
        <Link
            href={`/knjiga/${isbn}`}
            className="block"
        >
            <article className="flex gap-6 rounded-lg border border-gray-300 bg-white p-4 shadow-sm">

                {/* Placeholder za koricu */}
                <div className="flex h-40 w-28 shrink-0 items-center justify-center rounded border border-dashed border-gray-400 bg-gray-100 text-center text-sm text-gray-500">
                    Korica
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