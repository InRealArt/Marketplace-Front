'use server'
import { Address } from "viem"
import prisma from "./prisma"

export interface TransactionData {
    tokenId: number
    functionName: string
    transactionHash: string
    from: Address
    to: Address
    price: number
}

async function createTransactionData(data: TransactionData) {
    const transaction = await prisma.transaction.create({
        data
    })
    return transaction
}

export { createTransactionData }
