"use server";

import { runSeed } from "@/lib/seed";

import type { ActionResult } from "@/lib/types";

export async function initializeCatalog(
    prevState: ActionResult,
    formData: FormData
): Promise<ActionResult> {

    return await runSeed();
}

