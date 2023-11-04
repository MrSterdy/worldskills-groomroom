import type { RequestEvent } from "@sveltejs/kit";

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "$lib/consts";
import { generateJwt } from "$lib/server/services/userService";
import type { User } from "$lib/types";

export async function login(event: RequestEvent, user: User) {
    const tokens = generateJwt(user);

    event.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        domain: event.url.hostname,
        path: "/"
    });
    event.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        domain: event.url.hostname,
        path: "/"
    });
}
