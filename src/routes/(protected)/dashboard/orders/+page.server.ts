import type { PageServerLoad } from "./$types";
import { getUserOrders } from "$lib/server/services/orderService";

export const load: PageServerLoad = async event => {
    const page = parseInt(event.url.searchParams.get("page") || "1") ?? 1;

    const orders = await getUserOrders(event.locals.user!.username, page);

    return { orders };
};
