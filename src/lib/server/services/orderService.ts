import { pageSize } from "$lib/consts";
import prisma from "$lib/server/db";
import type { List, Order } from "$lib/types";
import { orderIdToImageUrl } from "$lib/utils";

export async function getUserOrders(
    username: string,
    page = 1
): Promise<List<Order>> {
    const [total, orders] = await prisma.$transaction([
        prisma.order.count({ where: { username } }),
        prisma.order.findMany({
            take: pageSize,
            skip: Math.abs(page - 1) * pageSize,
            where: {
                username
            }
        })
    ]);

    return {
        items: orders.map(order => ({
            id: order.id,
            petName: order.petName,
            petPhoto: orderIdToImageUrl(order.id),
            status: order.status
        })),
        page,
        total
    };
}

export async function createOrder(
    username: string,
    order: Omit<Order, "id" | "status">
) {
    await prisma.order.create({
        data: {
            username,
            petName: order.petName,
            petPhoto: {
                create: {
                    data: order.petPhoto
                }
            }
        }
    });
}

export async function getImageByOrderId(
    orderId: number
): Promise<string | null> {
    const result = await prisma.orderImage.findFirst({ where: { orderId } });

    return result?.data ?? null;
}
