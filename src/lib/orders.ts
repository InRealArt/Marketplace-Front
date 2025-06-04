'use server'
import { OrderStatus } from "@prisma/client"
import prisma from "./prisma"
import { NftId, UserId } from "@/types"

interface OrderData {
    userId: string
    nftId: NftId
    subtotalPrice: number
    vatAmount: number
    totalPrice: number
    vatRate: number
    paymentMethod: string
    customerName: string
    customerEmail: string
    billingAddressId: number
    billingStreetAddress: string
    billingPostalCode: string
    billingCity: string
    billingCountry: string
    billingVatNumber?: string
}

async function createOrder(data: OrderData) {
    const { userId, nftId, subtotalPrice, vatAmount, totalPrice, vatRate, paymentMethod, customerName, customerEmail, billingAddressId, billingStreetAddress, billingPostalCode, billingCity, billingCountry, billingVatNumber } = data
    const profile = await prisma.order.create({
        data: {
            orderNumber: `ORDER-${Date.now()}`, // Generate unique order number
            subtotalPrice,
            vatAmount,
            totalPrice,
            vatRate,
            paymentMethod,
            customerId: userId,
            customerName,
            customerEmail,
            billingAddressId,
            billingStreetAddress,
            billingPostalCode,
            billingCity,
            billingCountry,
            billingVatNumber
        }
    })
    return profile
}

async function fetchOrdersByUser(userId: UserId) {
    const orders = await prisma.order.findMany({
        where: {
            customerId: userId
        }
    })
    return orders
}

export { fetchOrdersByUser, createOrder }
