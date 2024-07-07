import React, { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { ArtistId, ArtistType, NftId, NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import Link from 'next/link';
import {
  http,
  type Hash,
  type TransactionReceipt,
  createWalletClient,
  custom,
  keccak256, toBytes, WalletClient, Address
} from 'viem'
import Image from 'next/image';
import { useEthPrice } from '@/customHooks/getETHPrice';
import { publicClient } from '@/app/providers';
import { marketplaceAddress } from '@/utils/constants';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { useAccount, useReadContract } from 'wagmi';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { IraIERC721Abi } from '@/web3/IraIERC721Abi';
import { updateNft } from '@/lib/nfts';
import { ResourceNftStatuses } from '@prisma/client';
import { TransactionData, createTransactionData } from '@/lib/transaction';
import { updateNftById } from '@/redux/reducers/nfts/reducer';
import { useDispatch } from 'react-redux';

interface SellModalProps extends Partial<NftType>, Partial<ArtistType> {
  showSellModal: boolean;
  hide: () => void;
  isSelling: boolean;
  isSuccess: boolean;
  showNftModal: boolean;
  contractAddress: Address
  price: number
  artistId: ArtistId | undefined
}

interface SellModalContentProps extends Partial<NftType>, Partial<ArtistType> {
  showSellModal: boolean;
  hide: () => void;
  isSelling: boolean;
  isSuccess: boolean;
  isApproved: boolean;
  isApproving: boolean;
  isListing: boolean;
  showNftModal: boolean;
  contractAddress: Address
  price: number
  artistId: ArtistId | undefined
  handleListNft: () => void,
  handleApprove: () => void,
  newPrice: string,
  setNewPrice: React.Dispatch<React.SetStateAction<string>>;
  receipt: TransactionReceipt | undefined
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
    <div className="SellModal">
      {imageUri && <div
        className="SellModal__img"
        style={{
          backgroundImage: ` url('${getImageFromUri(imageUri)}')`,
        }}
      />}
      <div className="SellModal__infos">
        <p className="SellModal__description">
          This artwork now belongs to you. To list it for sale on our marketplace, please choose a selling price in ETH.
          2 steps:
          Click on &quot;approve&quot; to approve listing your RWA on our marketplace.
          List your RWA on our MARKETPLACE with the price of your choice
        </p>
        <div className="SellModal__buttons">
          <Input
            className='LoginModal__input'
            placeholder="10 ETH"
            onChange={(e) => setNewPrice(e?.target?.value)}
            value={newPrice}
          />
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

const SellModalSuccessfulContent = ({ hide, imageUri, name }: SellModalProps) => (
  <div className="SellModal SellModal--successful">
    <p className="SellModal__description">
      Votre oeuvre <b>{name}</b> est désormais lister sur la marketplace InRealArt !
    </p>
    {(imageUri) && <>
      <Image width={100} height={100} className="SellModal__miniature" alt='nft-image' src={getImageFromUri(imageUri)} />
    </>
    }
    <div className="SellModal__buttons">
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


const SellModal = (props: SellModalProps) => {

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

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      });
      setWalletClient(walletClient);
    }
  }, []);

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


  const { data: ownerNft } = useReadContract({
    abi: IraIERC721Abi,
    address: props.contractAddress as Address,
    functionName: "ownerOf",
    args: [BigInt(props.tokenId || 0)]
  })

  const handleApprove = async () => {
    if (walletClient && userAddress && !isSeller) {
      checkAndGrantSellerRole().catch((err) => {
        console.error('Error granting SELLER role:', err)
        toast.error('Failed to grant SELLER role')
      })
    }
    if (ownerNft != userAddress) {
      toast.error(`You are not the owner of the tokenId ${props.tokenId}`)
      return
    }
    console.log('Owner NFT | userAddress : ', `${ownerNft} | ${userAddress}`)
    setIsApproving(true)
    const collectionAddress = props.contractAddress as Address
    const tokenId_ = props.tokenId as number
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
    await publicClient.waitForTransactionReceipt({ hash: hashApproval as Address })
    setIsApproved(true)
    setIsApproving(false)
  }

  //----------------------------------------------------------
  const updateNftToListedStatus = async (itemCount: number) => {
    console.log(`Update NFT tokenId ${props.tokenId} to 'LISTED' status `)

    try {
      await updateNft({
        transactionHash: hash,
        owner: marketplaceAddress,
        status: ResourceNftStatuses.LISTED,
        itemId: itemCount
      }, props.id as number)
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
      toast.error(`You are not the owner of the tokenId ${props.tokenId}`)
    }
    if (!isSeller) {
      toast.error(`You must be granted by the ADMIN as a SELLER. Please contact the admin of the Marketplace`)
    }

    setIsListing(true)
    const tokenId_ = props.tokenId as number

    const { request } = await publicClient.simulateContract({
      address: marketplaceAddress,
      abi: marketplaceAbi,
      functionName: 'listItem',
      args: [
        props.contractAddress as Address,
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

    // Update le record dans la table ResourceNft 
    await updateNftToListedStatus(Number(itemCount))
    dispatch(updateNftById({ nftId: props.id as NftId, status: ResourceNftStatuses.LISTED, purchaseOnce: false }))

    //Dernière étape : Créer un enregistrement dans la table 'Transaction'
    const transactionData: TransactionData = {
      tokenId: tokenId_,
      functionName: 'listItem',
      from: userAddress as Address,
      to: marketplaceAddress,
      transferFrom: userAddress as Address,
      transferTo: marketplaceAddress,
      price: Number(newPrice),
      transactionHash: hash as Address
    }
    await createTransactionData(transactionData)
    setIsListed(true)
    setIsListing(false)
  }


  return(<Modal
    title={receipt ? 'NFT mis en vente 🥳' : 'List my RWA'}
    show={props.showSellModal}
    hide={props.hide}
  >
    {isListed || props.showNftModal ? (
      <SellModalSuccessfulContent {...props} />
    ) : (
      <SellModalContent
        {...props}
        handleListNft={handleListNft}
        handleApprove={handleApprove}
        isApproved={isApproved}
        isApproving={isApproving}
        isListing={isListing}
        receipt={receipt}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
      />
    )}
  </Modal>)
}

export default SellModal;
