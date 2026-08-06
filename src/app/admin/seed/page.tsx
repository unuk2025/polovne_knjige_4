"use client";

import { useActionState } from "react";
import { initializeCatalog } from "./actions";
import type { ActionResult } from "@/lib/types";

const initialState: ActionResult = {
    success: false,
    message: "",
};

export default function SeedPage() {

    const [state, formAction, pending] = useActionState(
        initializeCatalog,
        initialState
    );

    return (
        <main className="p-8">

            <h1 className="mb-6 text-2xl font-bold">
                Inicijalizacija baze
            </h1>

            <form action={formAction}>

                <button
                    type="submit"
                    disabled={pending}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {pending
                        ? "Učitavanje..."
                        : "Učitaj početni katalog"}
                </button>

            </form>

            {state.message && (

                <p
                    className={`mt-6 rounded p-3 w-fit ${
                        state.success
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {state.message}
                </p>

            )}

        </main>
    );
}