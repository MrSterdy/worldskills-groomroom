import type { orderStatuses } from "$lib/consts";

export type User = {
    username: string;

    email: string | null;

    givenName: string;
    familyName: string;
    middleName: string;

    isAdmin: boolean;
};

export type Order = {
    id: number;

    creationDate: string;

    user: string;

    petName: string;
    petPhoto: string;
    processedPetPhoto: string | null;

    status: keyof typeof orderStatuses;
};

export type List<T> = {
    items: T[];

    page: number;

    total: number;
};
