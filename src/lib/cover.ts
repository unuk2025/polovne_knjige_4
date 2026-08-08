import { stat } from "node:fs/promises";
import path from "node:path";

const PLACEHOLDER_IMAGE = "/slike/placeholder.jpg";

export async function getCoverImage(
    slikaKorice: string | null
): Promise<string> {
    if (!slikaKorice) {
        return PLACEHOLDER_IMAGE;
    }

    try {
        const filePath = path.join(
            process.cwd(),
            "public",
            slikaKorice.replace(/^\/+/, "")
        );

        const fileInfo = await stat(filePath);

        if (fileInfo.size === 0) {
            return PLACEHOLDER_IMAGE;
        }

        return slikaKorice;
    } catch {
        return PLACEHOLDER_IMAGE;
    }
}
