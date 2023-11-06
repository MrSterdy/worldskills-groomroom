import type { RequestEvent } from "./$types";
import { error } from "@sveltejs/kit";
import { getImageByOrderId } from "$lib/server/services/orderService";

export async function GET(event: RequestEvent) {
    const id = parseInt(event.params.orderId);

    if (isNaN(id)) {
        throw error(400);
    }

    const rawImage = await getImageByOrderId(id, event.url.searchParams.get("isProcessed") === "true");
    if (!rawImage) {
        throw error(400);
    }

    const buffer = Buffer.from(rawImage.split(",")[1], "base64");

    return new Response(buffer);
}
