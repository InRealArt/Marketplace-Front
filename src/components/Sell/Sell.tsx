'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Button from '../Button/Button'
import { BuyModalProps } from '../Modal/BuyModal'
// BLOCKCHAIN
import { marketplaceAddress } from '@/utils/constants';
import { toast } from 'sonner';
import { ResourceNftStatuses} from "@prisma/client"
import {
  useWaitForTransactionReceipt,
  useAccount,
  useWriteContract,
  useReadContract,
} from 'wagmi';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { Abi, Address, WriteContractParameters, parseEther } from 'viem'
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi'
import { useAppSelector } from '@/redux/hooks'
import { publicClient, walletSuperAdminMarketplace } from '@/app/providers'
import { privateKeyToAccount } from 'viem/accounts'
import { IraIERC721Abi } from '@/web3/IraIERC721Abi'
import { updateNft } from '@/lib/nfts';

interface SellProps extends Partial<BuyModalProps> {
  
}

const Sell = ({id, tokenId, contractAddress} : SellProps) => {
    //------------------------------------------------ WEB3 state vars
    const [newPrice, setNewPrice] = useState<string>('')
    const { data: hash, writeContract, error, isError } = useWriteContract();
      // Use the useWaitForTransactionReceipt hook to wait for the transaction to be mined and return loading and success states
    const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });
    const addRecentTransaction = useAddRecentTransaction();

    const { isConnected, address } = useAccount();

    const { data: ownerNft } = useReadContract({
      abi: IraIERC721Abi,
      address: contractAddress as Address,
      functionName: "ownerOf",
      args: [BigInt(tokenId || 0)]
    });


    const listNft = async () => {
        //alert('NEW PRICE : ' + newPrice + '\n Addresse collection : ' +contractAddress +'\n TokenId = ' + tokenId)  
        //console.log('TokenId to resell : ', tokenId)
        if (tokenId) {
          console.log('OWNER OF NFT : ', ownerNft)
          console.log('Adress connected : ', address)
          if (ownerNft != address) {
            toast.error('You are not the owner of the NFT')
          }
          //TODO ??
          //STEP 1 : The Super Admin of the MarketPlace must give SELLER_ROLE to owner of the NFT
          /*
          const { request } = await publicClient.simulateContract({
            address: contractAddress as Address,
            abi: marketplaceAbi,
            functionName: 'addSellerRole',
            args: [ownerNft as Address],
            account: privateKeyToAccount(process.env.NEXT_PUBLIC_PRIVATE_KEY_SUPER_ADMIN_MARKETPKACE as Address)
          })
          await walletSuperAdminMarketplace.writeContract(request as WriteContractParameters<Abi>)
          */
          

          //STEP 2 : The owner of the NFT can resell the NFT
          const tokenId_ =  tokenId as number
          writeContract({
            address: marketplaceAddress,
            abi: marketplaceAbi,
            functionName: "listItem",
            args: [
              contractAddress as Address,
              BigInt(tokenId_),
              BigInt(Number(newPrice) * Math.pow(10, 18)),
            ],
          });
    
        }
        else {

        }
    } 

    useEffect(() => {
      if (isSuccess) {
        const updateNftToListedStatus = async () => {
          try {
            await updateNft({
              transactionHash: hash,
              owner: address,
              status: ResourceNftStatuses.LISTED
            }, id as number)
          }
          catch (err) {
            console.error("Update NFT to LISTED status", err);
          }
        };
        console.log(`Update NFT id ${id} with status LISTED`)
        updateNftToListedStatus()
      }
    }, [isSuccess])

    
    // useEffect(() => {
    //     if (isSuccess) {
    //       toast.success('NFT has been listed for selling, congrats !');
    //       if (hash) {
    //         addRecentTransaction({ hash, description: 'Nft listing' });
    //       }
    //     }
    //     if (isError) {
    //       toast.error(`NFT has not been listed for selling :  ${error}`);
    //     }
    //   }, [isSuccess, isError]);
    

      
    return (
        <>
            <div className='BuyModal__inputSell'>{'Remettre en vente : '}</div>
            <Input
                className='LoginModal__input'
                placeholder="10 ETH"
                onChange={(e) => setNewPrice(e?.target?.value)}
                value={newPrice}
                
            />
            <Button
                action={() => listNft()}
                text={'Remettre en vente'}
                additionalClassName="purple--marginTop"
                />
        </>
    )
}

export default Sell