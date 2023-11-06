import type { Handle } from "@sveltejs/kit";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "$lib/consts";
import { decodeJwt, getUserByUsername } from "$lib/server/services/userService";
import type { User } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import { login } from "$lib/server/utils/auth";

export const handle: Handle = async ({ event, resolve }) => {
    const accessToken = event.cookies.get(ACCESS_TOKEN_COOKIE);
    const refreshToken = event.cookies.get(REFRESH_TOKEN_COOKIE);

    const path = event.url.pathname;

    if (!accessToken && !refreshToken) {
        if (path.startsWith("/dashboard")) {
            throw redirect(303, "/auth/login");
        }

        return resolve(event);
    }

    let user: User | null = null;
    let refresh = false;

    if (accessToken || refreshToken) {
        if (accessToken) {
            const rawUser = decodeJwt(accessToken);
            if (rawUser && typeof rawUser === "object") {
                user = rawUser;
            }
        }

        if (!user && refreshToken) {
            const username = decodeJwt(refreshToken);
            if (typeof username === "string") {
                const rawUser = await getUserByUsername(username);
                if (rawUser) {
                    refresh = true;
                    user = rawUser;
                }
            }
        }
    }

    if (user) {
        event.locals.user = user;

        if (refresh) {
            await login(event, user);
        }

        if (event.url.pathname.startsWith("/auth")) {
            throw redirect(303, "/dashboard");
        }
    } else if (event.url.pathname.startsWith("/dashboard")) {
        throw redirect(303, "/auth/login");
    }

    return resolve(event);
};
