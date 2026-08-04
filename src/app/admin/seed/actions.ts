"use server";

import { runSeed } from "@/lib/seed";

export async function initializeCatalog() {
    await runSeed();
}

