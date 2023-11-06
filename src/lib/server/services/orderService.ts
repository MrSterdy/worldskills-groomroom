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
            orderBy: {
                creationDate: "asc"
            },
            where: {
                username
            }
        })
    ]);

    return {
        items: orders.map(order => ({
            id: order.id,
            user: order.username,
            creationDate: order.creationDate.toISOString(),
            petName: order.petName,
            petPhoto: orderIdToImageUrl(order.id),
            status: order.status
        })),
        page,
        total
    };
}

export async function getOrderById(orderId: number): Promise<Order | null> {
    const result = await prisma.order.findFirst({ where: { id: orderId } });

    return result
        ? {
              id: result.id,
              user: result.username,
              creationDate: result.creationDate.toISOString(),
              petName: result.petName,
              petPhoto: orderIdToImageUrl(result.id),
              status: result.status
          }
        : null;
}

export async function deleteOrder(orderId: number) {
    await prisma.order.delete({ where: { id: orderId } });
}

export async function createOrder(
    username: string,
    order: Omit<Order, "id" | "creationDate" | "status">
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
