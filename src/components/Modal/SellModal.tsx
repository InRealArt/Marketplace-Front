'use client'
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { ArtistType, ModalType, NftId, NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import {
  http,
  type Hash,
  type TransactionReceipt,
  createWalletClient,
  custom,
  keccak256, toBytes, WalletClient, Address
} from 'viem'
import Image from 'next/image';
import { CHAIN_USED, publicClient } from '@/app/providers';
import { marketplaceAddress } from '@/utils/constants';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { useAccount, useReadContract } from 'wagmi';
import { privateKeyToAccount } from 'viem/accounts';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { IraIERC721Abi } from '@/web3/IraIERC721Abi';
import { updateNft } from '@/lib/nfts';
import { ResourceNftStatuses } from '@prisma/client';
import { TransactionData, createTransactionData } from '@/lib/transactions';
import { closeModal, updateNftById } from '@/redux/reducers/nfts/reducer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hooks';
import { currentNftSelected } from '@/redux/reducers/nfts/selectors';

// Input styling constant for consistency with other forms
const InputStyle = "text-white rounded-[10px] border-2 border-[#b39e73] bg-transparent w-full h-[64px] py-[10px] px-[15px] font-poppins text-[18px] tracking-[-0.25px] mt-[15px] focus:bg-transparent focus:outline-none";

interface SellModalSuccessfulProps extends Partial<NftType>, Partial<ArtistType> {
  hide: () => void;
}

interface SellModalContentProps extends Partial<NftType>, Partial<ArtistType> {
  hide: () => void;
  isApproved: boolean;
  isApproving: boolean;
  isListing: boolean;
  handleListNft: () => void,
  handleApprove: () => void,
  newPrice: string,
  setNewPrice: React.Dispatch<React.SetStateAction<string>>;
}

const SellModalContent = ({
  imageUri,
  handleListNft,
  handleApprove,
  isApproved,
  isApproving,
  isListing,
  newPrice,
  setNewPrice
}: SellModalContentProps) => {


  return (
    <div className="flex flex-col items-center gap-[30px] mt-[20px] md:flex-row">
      {imageUri && <div
        className="w-full h-[250px] rounded-[10px] bg-no-repeat bg-cover bg-center md:w-[230px] md:h-[270px] md:flex-none"
        style={{
          backgroundImage: ` url('${getImageFromUri(imageUri)}')`,
        }}
      />}
      <div className="flex flex-col gap-[15px] md:gap-[25px]">
        <p className="m-0 font-poppins text-[16px]">
          This artwork now belongs to you. To list it for sale on our marketplace, please follow the following steps:
          <br /><br />
          &#x2022; Click on &quot;approve&quot; to approve listing your RWA on our marketplace.<br /><br />
          &#x2022; When approved, select the price of your choice then click on &quot;Relist for sale&quot; to list your RWA on our marketplace.
        </p>
        <div className="flex gap-[15px]">
          {isApproved && <Input
            type='number'
            className={InputStyle}
            placeholder="0.001"
            onChange={(e) => setNewPrice(e?.target?.value)}
            value={newPrice}
            disabled={isListing}
          />}
          {!isApproved && (
            <Button
              action={handleApprove}
              text={isApproving ? 'Approving...' : 'Approve'}
              additionalClassName="purple--marginTop"
              disabled={isApproving}
            />
          )}
          {isApproved && (
            <Button
              action={handleListNft}
              text={isListing ? 'Relisting...' : 'Relist for sale'}
              additionalClassName="purple--marginTop"
              disabled={isListing}
            />
          )}
        </div>
      </div>
    </div>
  )
};

const SellModalSuccessfulContent = ({ hide, imageUri, name }: SellModalSuccessfulProps) => (
  <div className="flex flex-col items-center gap-[30px] mt-[20px]">
    <p className="m-0 font-poppins text-[16px]">
      Your artwork <b>{name}</b> is now listed on the InRealArt marketplace!
    </p>
    {(imageUri) && <>
      <Image width={100} height={100} className="rounded-[10px] w-1/2 h-auto" alt='nft-image' src={getImageFromUri(imageUri)} />
    </>
    }
    <div className="flex gap-[15px]">
      <Button
        action={hide}
        text={'Cancel Listing'}
        additionalClassName="gold"
        disabled
      />
    </div>
  </div>
);

const SELLER_ROLE = keccak256(toBytes("SELLER_ROLE"));


const SellModal = () => {
  const [newPrice, setNewPrice] = useState<string>('')
  const [hashApproval, setHashApproval] = useState<Hash>()
  const [hash, setHash] = useState<Hash>()
  const [receipt, setReceipt] = useState<TransactionReceipt>()
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [isListing, setIsListing] = useState(false)
  const [isListed, setIsListed] = useState(false)

  const [isSeller, setIsSeller] = useState(false);
  const { address: userAddress } = useAccount()

  const dispatch = useDispatch()

  const [walletClient, setWalletClient] = useState<WalletClient>();

  const currentNftInfos = useAppSelector((state) => currentNftSelected(state))
  const { infos: currentNft, success, contractAddress } = currentNftInfos
  const isModalDisplay = currentNftInfos.infos !== null && currentNftInfos.modalType === ModalType.SELL

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const walletClient = createWalletClient({
        chain: CHAIN_USED,
        transport: custom(window.ethereum),
      });
      setWalletClient(walletClient);
    }
    if (!isModalDisplay) {
      setIsListed(false)// TO REFACTO
      setIsApproved(false) // TO REFACTO
      setNewPrice('')
    }
  }, [isModalDisplay]);

  const checkAndGrantSellerRole = async () => {
    // Vérifiez si l'utilisateur a déjà le rôle de SELLER
    const hasRole = await publicClient.readContract({
      address: marketplaceAddress,
      abi: marketplaceAbi,
      functionName: 'hasRole',
      args: [SELLER_ROLE, userAddress as Address],
    })

    if (hasRole) {
      setIsSeller(true);
      return
    }

    // Utilisez le walletClient de l'admin pour accorder le rôle de SELLER
    const adminAccount = privateKeyToAccount(`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY_SUPER_ADMIN_MARKETPLACE}` as Address);
    const adminClient = createWalletClient({
      chain: CHAIN_USED,
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
  };

  const handleApprove = async () => {
    try {
      setIsApproving(true)
      const _hasRole = await publicClient.readContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: 'hasRole',
        args: [SELLER_ROLE, userAddress as Address],
      })

      if (!_hasRole) {
        await checkAndGrantSellerRole()
      }
      // Add check since the user might refuse to approve
      if (!walletClient) {
        setIsApproving(false)
        return null
      }
      const hashApproval = await walletClient.writeContract({
        account: userAddress as Address,
        address: contractAddress as Address,
        abi: IraIERC721Abi,
        functionName: 'approve',
        args: [marketplaceAddress, BigInt(currentNft.tokenId)],
      })
      setHashApproval(hashApproval)
      toast.success("Your approval transaction has been submitted")
      await publicClient.waitForTransactionReceipt({ hash: hashApproval })
      setIsApproving(false)
      setIsApproved(true)
      toast.success("Your approval transaction has been mined")
    } catch (err) {
      console.log(err)
      setIsApproving(false)
    }
  }

  const updateNftToListedStatus = async (itemCount: number) => {
    try {
      await updateNft({
        transactionHash: hash,
        owner: marketplaceAddress,
        status: ResourceNftStatuses.LISTED,
        itemId: itemCount
      }, currentNft?.id as number)
    }
    catch (err) {
      console.error("Error Update NFT to LISTED status", err)
    }
  }

  const updateNftWithPreviousOwner = async (previousOwner: Address) => {
    try {
      await updateNft({
        transactionHash: hash,
        previousOwner,
        owner: marketplaceAddress,
        status: ResourceNftStatuses.LISTED,
      }, currentNft?.id as number)
    }
    catch (err) {
      console.error("Error Update NFT with previous Owner", err)
    }
  }

  const handleListNft = async () => {
    if (!newPrice || parseFloat(newPrice) <= 0) {
      return toast.error("Please set a valid price (above 0)")
    }
    try {
      setIsListing(true)
      if (!walletClient) {
        setIsListing(false)
        return
      }

      // Get count of items for making Id unique
      const itemCount = await publicClient.readContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: 'itemCount',
      }) as bigint

      const hash = await walletClient.writeContract({
        account: userAddress as Address,
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: 'listItem',
        args: [contractAddress as Address, BigInt(currentNft.tokenId), parseFloat(newPrice) * 10 ** 18],
      })

      setHash(hash)
      toast.success("Your transaction to list item has been submitted")
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      setReceipt(receipt)
      await Promise.all([
        updateNftToListedStatus(Number(itemCount)),
        updateNftWithPreviousOwner(userAddress as Address)
      ])

      toast.success("Your transaction to list item has been mined")
      setIsListed(true)
      // Update Transactions collection
      // await createTransactionData({
      //   hash: hash,
      //   from: receipt.from,
      //   to: receipt.to as string,
      //   type: TransactionData.LIST,
      //   chainId: Number(CHAIN_USED.id),
      //   nftId: currentNft.id as number,
      //   gasPrice: Number(receipt.gasPrice) / 10 ** 18,
      //   value: parseFloat(newPrice)
      // })
    } catch (err) {
      console.log(err)
      setIsListing(false)
    }
  }
  
  return (
    <Modal
      title="Sell your artwork"
      show={isModalDisplay}
      hide={() => dispatch(closeModal())}
    >
      {isListed ?
        <SellModalSuccessfulContent
          hide={() => dispatch(closeModal())}
          imageUri={currentNft?.tokenURI}
          name={currentNft?.name}
        /> :
        <SellModalContent
          hide={() => dispatch(closeModal())}
          imageUri={currentNft?.tokenURI}
          handleListNft={handleListNft}
          handleApprove={handleApprove}
          isApproved={isApproved}
          isApproving={isApproving}
          isListing={isListing}
          newPrice={newPrice}
          setNewPrice={setNewPrice}
        />
      }
    </Modal>
  );
};

export default SellModal;
