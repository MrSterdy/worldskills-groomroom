import { error, fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

import type { Actions, PageServerLoad } from "./$types";

import { allowedImageTypes, maxFileSize } from "$lib/consts";
import { createOrder } from "$lib/server/services/orderService";
import type { Order } from "$lib/types";
import { bytesToMegabytes } from "$lib/utils";
import { fileToDataUri } from "$lib/server/utils/file";

const orderForm = z.object({
    petName: z.string().max(64)
});

export const load: PageServerLoad = async () => {
    const form = await superValidate(orderForm);

    return { form };
};

export const actions: Actions = {
    default: async event => {
        const formData = await event.request.formData();

        const form = await superValidate(formData, orderForm);
        if (!form.valid) {
            return fail(400, { form });
        }

        const petImage = formData.get("petImage");
        if (
            !petImage ||
            !(petImage instanceof File) ||
            !allowedImageTypes.includes(petImage.type)
        ) {
            throw error(400);
        }

        if (petImage.size > maxFileSize) {
            return message(
                form,
                `Размер файла не должен превышать ${bytesToMegabytes(
                    maxFileSize
                ).toFixed(1)}Мб`,
                { status: 400 }
            );
        }

        const order: Omit<Order, "id" | "creationDate" | "status" | "user"> = {
            petName: form.data.petName,
            petPhoto: await fileToDataUri(petImage),
            processedPetPhoto: null
        };

        await createOrder(event.locals.user!.username, order);

        throw redirect(303, "/dashboard/orders");
    }
};
