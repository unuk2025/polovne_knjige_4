import { initializeCatalog } from "./actions";

export default function SeedPage() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-6">
                Inicijalizacija baze
            </h1>

            <form action={initializeCatalog}>
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Učitaj početni katalog
                </button>
            </form>
        </main>
    );
}