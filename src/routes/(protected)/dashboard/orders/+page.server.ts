import type { Actions, PageServerLoad } from "./$types";
import { deleteOrder, getOrderById, getUserOrders } from "$lib/server/services/orderService";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";
import { error, fail } from "@sveltejs/kit";

const idForm = z.object({
    id: z.number()
});

export const load: PageServerLoad = async event => {
    const page = parseInt(event.url.searchParams.get("page") || "1") ?? 1;
    const form = await superValidate(idForm);

    const orders = await getUserOrders(event.locals.user!.username, page);

    return { orders, form };
};

export const actions: Actions = {
    default: async event => {
        const form = await superValidate(event.request, idForm);
        if (!form.valid) {
            return fail(400, { form });
        }

        const order = await getOrderById(form.data.id);
        if (!order || order.status !== "NEW") {
            throw error(400);
        }
        if (order.user !== event.locals.user!.username) {
            throw error(403);
        }

        await deleteOrder(form.data.id);
    }
};
