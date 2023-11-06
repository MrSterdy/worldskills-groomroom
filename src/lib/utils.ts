export function orderIdToImageUrl(orderId: number) {
    return `/image/${orderId}`;
}

export function bytesToMegabytes(bytes: number) {
    return bytes / 1048576;
}

export function megabytesToBytes(megabytes: number) {
    return megabytes * 1048576;
}
