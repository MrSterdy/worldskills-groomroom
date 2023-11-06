import { megabytesToBytes } from "$lib/utils";

export const ACCESS_TOKEN_COOKIE = "groomroom-access";
export const REFRESH_TOKEN_COOKIE = "groomroom-refresh";

export const pageSize = 10;

export const orderStatuses = {
    "NEW": "Отправлено",
    "PROCESSING": "Обрабатывается",
    "FINISHED": "Услуга оказана"
};

export const allowedImageTypes = ["image/bmp", "image/jpg", "image/jpeg"];

export const maxFileSize = megabytesToBytes(2);
