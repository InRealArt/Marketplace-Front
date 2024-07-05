'use server'
import prisma from "./prisma"

interface TransactionData {
    tokenId: number
    functionName: string
    transactionHash: string
    from: string
    to: string
}

async function createTransactionData(data: TransactionData) {
    const transaction = await prisma.transaction.create({
        data
    })
    return transaction
}

export { createTransactionData }
