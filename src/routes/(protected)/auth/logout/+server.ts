import type { RequestEvent } from "@sveltejs/kit";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "$lib/consts";

export function POST(event: RequestEvent) {
    event.cookies.delete(REFRESH_TOKEN_COOKIE, { path: "/" });
    event.cookies.delete(ACCESS_TOKEN_COOKIE, { path: "/" });

    return new Response();
}