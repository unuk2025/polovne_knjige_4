"use client";

import { useActionState, useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { currentUser } from "@/lib/user";
import { initializeCatalog } from "../admin/seed/actions";
import { cleanDatabase } from "../admin/clean/actions";
import type { ActionResult } from "@/lib/types";

const initialState: ActionResult = {
    success: false,
    message: "",
};

export default function BazaPage() {

    const [message, setMessage] = useState<{
        success: boolean;
        text: string;
    } | null>(null);

    const [state, formAction, pending] = useActionState(
        initializeCatalog,
        initialState
    );

    const [cleanState, cleanFormAction, cleanPending] = useActionState(
        cleanDatabase,
        initialState
    );

    useEffect(() => {
        if (state.message) {
            setMessage({
                success: state.success,
                text: state.message,
            });
        }
    }, [state]);

    useEffect(() => {
        if (cleanState.message) {
            setMessage({
                success: cleanState.success,
                text: cleanState.message,
            });
        }
    }, [cleanState]);

    if (currentUser.status !== "administrator") {
        redirect("/");
    }
    
    return (
        <main className="mx-auto max-w-6xl p-8">
            <h1 className="mb-8 text-3xl font-bold">
                Baza
            </h1>

            <div className="flex gap-8">
                <div className="flex h-40 w-64 items-center justify-center rounded-lg border border-gray-300">
                    <form
                        action={(formData) => {
                            setMessage(null);
                            formAction(formData);
                        }}
                    >
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
                </div>

                <div className="flex h-40 w-64 items-center justify-center rounded-lg border border-gray-300">
                    <form
                        action={(formData) => {
                            setMessage(null);
                            cleanFormAction(formData);
                        }}
                    >
                        <button
                            type="submit"
                            disabled={cleanPending}
                            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            {cleanPending
                                ? "Čišćenje..."
                                : "Čišćenje baze"}
                        </button>
                    </form>
                </div>
            </div>

            {message && (
                <p
                    className={`mt-6 w-fit rounded p-3 ${
                        message.success
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {message.text}
                </p>
            )}

        </main>
    );
}