"use server";

import { runClean } from "@/lib/clean";

import type { ActionResult } from "@/lib/types";

export async function cleanDatabase(
    prevState: ActionResult,
    formData: FormData
): Promise<ActionResult> {

    return await runClean();
}

