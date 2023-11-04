import { z } from "zod";

import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import { fail, redirect } from "@sveltejs/kit";
import { createUser, getUserByEmail, getUserByUsername } from "$lib/server/services/userService";
import type { User } from "$lib/types";

const registerForm = z.object({
    username: z.string().regex(/^[a-zA-Z-]+$/).max(16),
    email: z.string().email().max(64),
    givenName: z.string().regex(/^[А-ЯЁа-яё]+$/).max(64),
    familyName: z.string().regex(/^[А-ЯЁа-яё]+$/).max(64),
    middleName: z.string().regex(/^[А-ЯЁа-яё]+$/).max(64),
    password: z.string().max(16),
    confirmPassword: z.string().max(16)
});

export const load: PageServerLoad = async () => {
    const form = await superValidate(registerForm);

    return { form };
};

export const actions: Actions = {
    default: async event => {
        const form = await superValidate(event.request, registerForm);
        if (!form.valid) {
            return fail(400, { form });
        }

        if (form.data.password !== form.data.confirmPassword) {
            return message(form, "Пароли не совпадают");
        }

        const emailUser = await getUserByEmail(form.data.email);
        if (emailUser) {
            return message(form, "Почта уже занята");
        }

        const usernameUser = await getUserByUsername(form.data.username);
        if (usernameUser) {
            return message(form, "Логин уже занят");
        }

        const user: User = {
            username: form.data.username,
            email: form.data.email,
            givenName: form.data.givenName,
            familyName: form.data.familyName,
            middleName: form.data.middleName
        };

        await createUser(user, form.data.password);

        throw redirect(303, "/auth/login");
    }
};
