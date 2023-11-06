import type { orderStatuses } from "$lib/consts";

export type User = {
    username: string;

    email: string | null;

    givenName: string;
    familyName: string;
    middleName: string;
};

export type Order = {
    id: number;

    petName: string;
    petPhoto: string;

    status: keyof typeof orderStatuses;
};

export type List<T> = {
    items: T[];

    page: number;

    total: number;
};
