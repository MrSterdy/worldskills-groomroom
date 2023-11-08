import { error, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

import { allowedImageTypes } from "$lib/consts";
import { getOrderById, updateOrder } from "$lib/server/services/orderService";
import { fileToDataUri } from "$lib/server/utils/file";

export const load: PageServerLoad = async event => {
    const order = await getOrderById(parseInt(event.params.orderId) || -1);
    if (!order || order.status === "FINISHED") {
        throw error(400);
    }
    return { order };
};

export const actions: Actions = {
    default: async event => {
        const order = await getOrderById(parseInt(event.params.orderId) || -1);
        if (!order || order.status === "FINISHED") {
            throw error(400);
        }

        let doRedirect = false;

        if (order.status === "NEW") {
            order.status = "PROCESSING";
        } else {
            const form = await event.request.formData();
            const petImage = form.get("petImage");
            if (
                !petImage ||
                !(petImage instanceof File) ||
                !allowedImageTypes.includes(petImage.type)
            ) {
                throw error(400);
            }
            order.processedPetPhoto = await fileToDataUri(petImage);
            order.status = "FINISHED";
            doRedirect = true;
        }

        await updateOrder(order);

        if (doRedirect) {
            throw redirect(303, "/dashboard/orders/manage");
        }
    }
};
