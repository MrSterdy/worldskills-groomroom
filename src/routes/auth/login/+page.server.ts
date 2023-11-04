import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

import type { PageServerLoad, Actions } from "./$types";

import {
    comparePasswords,
    getUserEntityByUsername,
    mapUserEntityToUser
} from "$lib/server/services/userService";
import { login } from "$lib/server/utils/auth";

const loginForm = z.object({
    username: z.string().max(16),
    password: z.string().max(16)
});

export const load: PageServerLoad = async () => {
    const form = await superValidate(loginForm);

    return { form };
};

export const actions: Actions = {
    default: async event => {
        const form = await superValidate(event.request, loginForm);
        if (!form.valid) {
            return fail(400, { form });
        }

        const user = await getUserEntityByUsername(form.data.username);
        if (!user) {
            return message(form, "Неверный логин или пароль");
        }

        if (await comparePasswords(form.data.password, user.passwordHash)) {
            await login(event, mapUserEntityToUser(user));

            throw redirect(303, "/");
        }

        return message(form, "Неверный логин или пароль");
    }
};
