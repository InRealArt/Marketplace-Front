'use server'
import { OrderStatus } from "@prisma/client"
import prisma from "./prisma"
import { NftId, UserId } from "@/types"

interface OrderData {
    userId: string
    nftId: NftId
}

async function createOrder(data: OrderData) {
    const { userId, nftId } = data
    const profile = await prisma.order.create({
        data: {
            userId: userId || "",
            nftId,
            orderStatus: OrderStatus.WAITING_FOR_CONFIRMATION
        }
    })
    return profile
}

async function fetchOrdersByUser(userId: UserId) {
    const orders = await prisma.order.findMany({
        where: {
            userId
        }
    })
    return orders
}

export { fetchOrdersByUser, createOrder }
