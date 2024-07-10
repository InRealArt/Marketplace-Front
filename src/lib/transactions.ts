'use server'
import { Address } from "viem"
import prisma from "./prisma"

export interface TransactionData {
    tokenId: number
    functionName: string
    transactionHash: Address
    from: Address
    to: Address
    transferFrom: Address
    transferTo: Address
    price: number
}

async function createTransactionData(data: TransactionData) {    
    const transaction = await prisma.transaction.create({
        data
    })
    return transaction
}

async function fetchTransactionsByAddress() {
    const transactions = await prisma.transaction.findMany()
    return transactions
}

async function fetchTransactionsByNft() {
    const transactions = await prisma.transaction.findMany()
    
    return transactions
}

export { createTransactionData, fetchTransactionsByAddress, fetchTransactionsByNft }
