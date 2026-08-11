"use client";

import { prijaviKorisnika } from "./actions";

export default function LoginForm() {
    return (
        <form action={prijaviKorisnika} className="space-y-4">
            <div>
                <label
                    htmlFor="korisnickoIme"
                    className="mb-1 block font-medium"
                >
                    Korisničko ime
                </label>

                <input
                    id="korisnickoIme"
                    name="korisnickoIme"
                    type="text"
                    className="w-full rounded border border-gray-300 p-2"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor="lozinka"
                    className="mb-1 block font-medium"
                >
                    Lozinka
                </label>

                <input
                    id="lozinka"
                    name="lozinka"
                    type="password"
                    className="w-full rounded border border-gray-300 p-2"
                    required
                />
            </div>

            <button
                type="submit"
                className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
            >
                Prijavi se
            </button>
        </form>
    );
}