'use server'
import { Address } from "viem"
import prisma from "./prisma"

export interface TransactionData {
    tokenId: number
    functionName: string
    transactionHash: string
    from: Address
    to: Address
    transferFrom: Address
    transferTo: Address
    price: number
}

async function createTransactionData(data: TransactionData) {
    console.log("createTransactionData", data);
    
    const transaction = await prisma.transaction.create({
        data
    })
    return transaction
}

export { createTransactionData }
