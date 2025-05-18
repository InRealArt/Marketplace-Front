'use server'
import { Address } from "viem"
import prisma from "./prisma"
import { CollectionType, ItemPhysicalType } from "@/types"
import { Decimal } from "@prisma/client/runtime/library"

export interface TransactionData {
    tokenId: number | null
    contractAddress: Address
    functionName: string
    transactionHash: Address
    from: Address
    to: Address
    transferFrom: Address
    transferTo: Address
    price: Decimal | number | null
    created_at?: Date
}

async function createTransactionData(data: TransactionData) {    
    const transaction = await prisma.transaction.create({
        data
    })
    return transaction
}

async function fetchTransactionsByAddress(address: Address) {
    const transactions = await prisma.transaction.findMany({
        where: {
            from: address
        },
    })
    return transactions
}

async function fetchTransactionsByNft(tokenId: ItemPhysicalType['tokenId'], contractAddress: CollectionType['contractAddress']) {
    const transactions = await prisma.transaction.findMany({
        where: {
            tokenId,
            contractAddress
        },
    })
    
    return transactions
}

export { createTransactionData, fetchTransactionsByAddress, fetchTransactionsByNft }
