import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Button from '../Button/Button'
import { BuyModalProps } from '../Modal/BuyModal'
// BLOCKCHAIN
import { marketplaceAddress } from '@/utils/constants'
import { toast } from 'sonner'
import { ResourceNftStatuses} from "@prisma/client"
import {
  useWaitForTransactionReceipt,
  useAccount,
  useWriteContract,
  useReadContract,
} from 'wagmi'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { Abi, Address, WalletClient, WriteContractParameters, parseEther } from 'viem'
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi'

import { privateKeyToAccount } from 'viem/accounts'
import { IraIERC721Abi } from '@/web3/IraIERC721Abi'
import { updateNft } from '@/lib/nfts'
import { sepolia } from "wagmi/chains"
import {
  http,
  type Hash,
  type TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  keccak256, toBytes
} from 'viem'

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})

const SELLER_ROLE = keccak256(toBytes("SELLER_ROLE"));

const Sell = ({id, tokenId, contractAddress} : Partial<BuyModalProps>) => {
    //------------------------------------------------ WEB3 state vars
    const [newPrice, setNewPrice]         = useState<string>('')
    const [hashApproval, setHashApproval] = useState<Hash>()
    const [hash, setHash]                 = useState<Hash>()
    const [receipt, setReceipt]           = useState<TransactionReceipt>()
    const [isApproving, setIsApproving]   = useState(false)
    const [isApproved, setIsApproved]     = useState(false)
    const [isSeller, setIsSeller]         = useState(false);
    const { isConnected, address: userAddress } = useAccount()

    const [walletClient, setWalletClient] = useState<WalletClient>();

    useEffect(() => {
      if (typeof window !== 'undefined' && window.ethereum) {
        const walletClient = createWalletClient({
          chain: sepolia,
          transport: custom(window.ethereum),
        });
        setWalletClient(walletClient);
      }
    }, []);

    // useEffect pour vérifier si l'utilisateur qui vend son NFT a bien le role de SELLER
    useEffect(() => {
      if (!walletClient) return

      const checkAndGrantSellerRole = async () => {
        // Vérifiez si l'utilisateur a déjà le rôle de SELLER
        const hasRole = await publicClient.readContract({
          address: marketplaceAddress,
          abi: marketplaceAbi,
          functionName: 'hasRole',
          args: [SELLER_ROLE, userAddress as Address],
        })
        console.log(`${userAddress} hasRole SELLER : ${hasRole}`)

        if (hasRole) {
          setIsSeller(true);
          return
        }

        console.log('PRIVATE KEY ADMIN : ', process.env.NEXT_PUBLIC_PRIVATE_KEY_SUPER_ADMIN_MARKETPLACE)
        // Utilisez le walletClient de l'admin pour accorder le rôle de SELLER
        const adminAccount = privateKeyToAccount(`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY_SUPER_ADMIN_MARKETPLACE}` as Address);
        const adminClient = createWalletClient({
          chain: sepolia,
          transport: http(), 
          account: adminAccount,
        });

        // Ajoutez cette vérification avant d'utiliser adminClient
        if (!adminClient) {
          console.error('Admin client not initialized');
          return;
        }

        await adminClient.writeContract({
          address: marketplaceAddress,
          abi: marketplaceAbi,
          functionName: 'addSellerRole',
          args: [userAddress as Address],
          account: adminAccount,
        });


        // await publicClient.waitForTransactionReceipt({ hash })
        setIsSeller(true);
      };

      if (walletClient && userAddress && !isSeller) {
        checkAndGrantSellerRole().catch((err) => {
          console.error('Error granting SELLER role:', err)
          toast.error('Failed to grant SELLER role')
        })
      }
    }, [walletClient, userAddress, isSeller])

    const { data: ownerNft } = useReadContract({
      abi: IraIERC721Abi,
      address: contractAddress as Address,
      functionName: "ownerOf",
      args: [BigInt(tokenId || 0)]
    })

    const handleApprove = async () => {
      if (ownerNft != userAddress) {
        toast.error(`You are not the owner of the tokenId ${tokenId}`)
        return
      }
      console.log('Owner NFT | userAddress : ', `${ownerNft} | ${userAddress}`)
      setIsApproving(true)
      const collectionAddress = contractAddress as Address
      const tokenId_ = tokenId as number
      const { request } = await publicClient.simulateContract({
        address: collectionAddress,
        abi: IraIERC721Abi,
        functionName: 'approve',
        args: [
          marketplaceAddress as Address,
          BigInt(tokenId_),
        ],
        account: userAddress
      })
      
      const hashApproval = await walletClient?.writeContract(request)
      
      console.log('hashApproval : ', hashApproval)
      setHashApproval(hashApproval)

      // Attendre la fin de la transaction d'approbation
      await publicClient.waitForTransactionReceipt({ hash: hashApproval as Address})
      setIsApproved(true)
      setIsApproving(false)
    }

    //----------------------------------------------------------
    const updateNftToListedStatus = async (itemCount: number) => {
      console.log(`Update NFT tokenId ${tokenId} to 'LISTED' status `)
      
      try {
        await updateNft({
          transactionHash: hash,
          owner: marketplaceAddress,
          status: ResourceNftStatuses.LISTED,
          itemId: itemCount
        }, id as number)
      }
      catch (err) {
        console.error("Error Update NFT to LISTED status", err)
      }
    }

    //STEP 1 : User must approve current smart contract (Marketplace) to send his tokenId to the address of the SC
    const handleListNft = async () => {
      if (!hashApproval) {
        toast.error('You need to approve the transaction first')
        return
      }
      if (ownerNft != userAddress) {
        toast.error(`You are not the owner of the tokenId ${tokenId}`)
      }
      if (!isSeller) {
        toast.error(`You must be granted by the ADMIN as a SELLER. Please contact the admin of the Marketplace`)
      }
      
      const tokenId_ =  tokenId as number
      
      const { request } = await publicClient.simulateContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: 'listItem',
        args: [
          contractAddress as Address,
          BigInt(tokenId_),
          BigInt(Number(newPrice) * Math.pow(10, 18)),
        ],
        account: userAddress
      })
      const hash = await walletClient?.writeContract(request)
      setHash(hash as Address)

      // Appeler updateNftToListedStatus après la fin de handleListNft
      const receipt = await publicClient.waitForTransactionReceipt({ hash: hash as `0x${string}` })
      setReceipt(receipt)

      // Lire le dernier itemCount depuis le smart contract
      const itemCount = await publicClient.readContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: 'getItemCount',
      })

      // Update le record dans la table ResourceNft en mettant à jour le 
      await updateNftToListedStatus(Number(itemCount))
    }

    return (
        <div>
            <div className='BuyModal__inputSell'>{'Remettre en vente : '}</div>
            <Input
                className='LoginModal__input'
                placeholder="10 ETH"
                onChange={(e) => setNewPrice(e?.target?.value)}
                value={newPrice}
            />
             {!isApproved && (
              <Button
                action={handleApprove}
                text={'Approuver'}
                additionalClassName="purple--marginTop"
                disabled={isApproving}
              />
            )}
            {isApproved && (
              <Button
                action={handleListNft}
                text={'Remettre en vente'}
                additionalClassName="purple--marginTop"
              />
            )}
            
        </div>
    )
}

export default Sell