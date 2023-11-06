export function orderIdToImageUrl(orderId: number, isProcessed: boolean) {
    return `/image/${orderId}?isProcessed=${isProcessed}`;
}

export function bytesToMegabytes(bytes: number) {
    return bytes / 1048576;
}

export function megabytesToBytes(megabytes: number) {
    return megabytes * 1048576;
}
