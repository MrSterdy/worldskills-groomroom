export async function fileToDataUri(file: File) {
    return `data:${file.type};base64,${Buffer.from(
        await file.arrayBuffer()
    ).toString("base64")}`;
}
