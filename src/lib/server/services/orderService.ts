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
            },
            include: {
                processedPetPhoto: true
            }
        })
    ]);

    return {
        items: orders.map(order => ({
            id: order.id,
            user: order.username,
            creationDate: order.creationDate.toISOString(),
            petName: order.petName,
            petPhoto: orderIdToImageUrl(order.id, false),
            processedPetPhoto: order.processedPetPhoto
                ? orderIdToImageUrl(order.id, true)
                : null,
            status: order.status
        })),
        page,
        total
    };
}

export async function updateOrder(order: Order) {
    await prisma.order.update({
        data: {
            id: order.id,
            petName: order.petName,
            status: order.status,
            petPhoto: {
                connectOrCreate: {
                    create: {
                        data: order.petPhoto
                    },
                    where: {
                        orderId: order.id
                    }
                }
            },
            ...(order.processedPetPhoto
                ? {
                      processedPetPhoto: {
                          connectOrCreate: {
                              create: {
                                  data: order.processedPetPhoto
                              },
                              where: {
                                  orderId: order.id
                              }
                          }
                      }
                  }
                : {})
        },
        where: { id: order.id }
    });
}

export async function getOrders(page = 1): Promise<List<Order>> {
    const [total, orders] = await prisma.$transaction([
        prisma.order.count(),
        prisma.order.findMany({
            take: pageSize,
            skip: Math.abs(page - 1) * pageSize,
            orderBy: {
                creationDate: "asc"
            },
            include: {
                processedPetPhoto: true
            }
        })
    ]);

    return {
        items: orders.map(order => ({
            id: order.id,
            user: order.username,
            creationDate: order.creationDate.toISOString(),
            petName: order.petName,
            petPhoto: orderIdToImageUrl(order.id, false),
            processedPetPhoto: order.processedPetPhoto
                ? orderIdToImageUrl(order.id, true)
                : null,
            status: order.status
        })),
        page,
        total
    };
}

export async function getOrderById(orderId: number): Promise<Order | null> {
    const result = await prisma.order.findFirst({
        where: { id: orderId },
        include: { processedPetPhoto: true }
    });

    return result
        ? {
              id: result.id,
              user: result.username,
              creationDate: result.creationDate.toISOString(),
              petName: result.petName,
              petPhoto: orderIdToImageUrl(result.id, false),
              processedPetPhoto: result.processedPetPhoto
                  ? orderIdToImageUrl(result.id, true)
                  : null,
              status: result.status
          }
        : null;
}

export async function deleteOrder(orderId: number) {
    await prisma.order.delete({ where: { id: orderId } });
}

export async function createOrder(
    username: string,
    order: Omit<Order, "id" | "creationDate" | "status" | "user">
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
    orderId: number,
    isProcessed: boolean
): Promise<string | null> {
    const result = isProcessed
        ? await prisma.processedOrderImage.findFirst({ where: { orderId } })
        : await prisma.orderImage.findFirst({ where: { orderId } });

    return result?.data ?? null;
}
