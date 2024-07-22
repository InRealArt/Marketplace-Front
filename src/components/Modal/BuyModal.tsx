'use client'
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { ArtistType, ModalType, NftId, NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import Link from 'next/link';
import { getOpenSeaURL } from '@/utils/getOpenSeaURL';
import { Address, WalletClient, createWalletClient, custom, encodeFunctionData, parseEther, parseGwei } from 'viem';
import Image from 'next/image';
import { useEthPrice } from '@/customHooks/getETHPrice';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { createOrder } from '@/lib/orders';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { useAppSelector } from '@/redux/hooks';
import { updateNft } from '@/lib/nfts';
import { ResourceNftStatuses } from '@prisma/client';
import { closeModal, updateNftById } from '@/redux/reducers/nfts/reducer';
import { useDispatch } from 'react-redux';
import { TransactionData, createTransactionData } from '@/lib/transactions';
import { marketplaceAddress } from '@/utils/constants';
import { currentNftSelected } from '@/redux/reducers/nfts/selectors';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { toast } from 'sonner';
import { CHAIN_USED } from '@/app/providers';
import useCheckNetwork from '@/customHooks/useCheckNetwork';

export interface BuyModalProps extends Partial<NftType>, Partial<ArtistType> {
  isLoading: boolean
  purchaseItem?: () => void
  contractAddress?: Address
  hide: () => void
  price?: number
}

const BuyModalContent = ({ isLoading, purchaseItem, hide, imageUri, collectionId, price }: BuyModalProps) => {
  const [walletUser, setWalletUser] = useState<WalletClient>();
  const wrongNetwork = useCheckNetwork()
  const artist = useAppSelector((state) => getArtistByNft(state, collectionId || 0))
  const { ethPrice: ethEuroPrice } = useEthPrice('eur');
  const currentEthValue = ethEuroPrice
    ? Number(price) * ethEuroPrice
    : 0;
    
    useEffect(() => {
      if (typeof window !== 'undefined' && window.ethereum) {
        const walletClient = createWalletClient({
            chain: CHAIN_USED,
            transport: custom(window.ethereum),
        })
        setWalletUser(walletClient)
      }
  }, [])
    
  return (
    <div className="BuyModal">
      {imageUri && <div
        className="BuyModal__img"
        style={{
          backgroundImage: ` url('${getImageFromUri(imageUri)}')`,
        }}
      />}
      <div className="BuyModal__infos">
        <h3 className="BuyModal__price">{price} ETH</h3>
        <p className="BuyModal__description">
          Cette œuvre réalisé par <Link href={`/artists/${artist?.id}`} onClick={hide}>{artist?.pseudo}</Link> coûte actuellement{' '}
          <span>{price} ETH</span> ce qui représente donc l&apos;équivalent d&apos;environ {currentEthValue.toFixed(0)} €
        </p>
        <div className="BuyModal__buttons">
          <Button
            action={hide}
            text="Cancel"
            additionalClassName="goldBorder"
            disabled={isLoading}
          />
          <Button
            action={purchaseItem as () => void}
            text={isLoading ? 'Buying...' : 'Buy now'}
            additionalClassName="gold"
            disabled={isLoading || wrongNetwork}
          />
        </div>
      </div>
    </div>
  )
};

const BuyModalSuccessfulContent = ({ imageUri, certificateUri, tokenId, hide, contractAddress }: BuyModalProps) => (
  <div className="BuyModal BuyModal--successful">
    <p className="BuyModal__description">
      Congratulations, the artwork is now yours. We will contact you as soon as possible to arrange the delivery date of the artwork. You can also view and trade it from your wallet in the purchased NFTs.
      Your artwork will now appear in the &quot;Communautary&quot; tab !
    </p>
    <div className="BuyModal__flex">
      {(imageUri && certificateUri) && <>
        <Image width={100} height={100} className="BuyModal__miniature" alt='nft-image' src={getImageFromUri(imageUri)} />
        <a href={getImageFromUri(certificateUri)} target='_blank' rel='noreferrer' className="BuyModal__download">Télécharger votre certificat d&apos;authenticité ici</a>
      </>
      }
    </div>
    <div className="BuyModal__buttons">
      <Button
        action={hide}
        text={'Close'}
        additionalClassName="whiteBorder"
      />
      {tokenId && contractAddress &&
        <div>
          <a target='_blank' rel='noreferrer' href={getOpenSeaURL(tokenId, contractAddress)} >
            <Button
              action={hide}
              text={'See my NFT Opensea'}
              additionalClassName="purple"
            />
          </a>
        </div>
      }
    </div>
  </div>
);

const BuyModal = () => {
  const user = useAppSelector((state) => getUserInfos(state))
  const currentNftInfos = useAppSelector((state) => currentNftSelected(state))
  const { infos: currentNft, success, price, contractAddress } = currentNftInfos
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal();

  const dispatch = useDispatch()

  const isModalDisplay = currentNftInfos.infos !== null && currentNftInfos.modalType === ModalType.BUY

  const { data: hash, writeContract } = useWriteContract();

  const purchaseItem = async () => {
    if (currentNft?.itemId && currentNft?.tokenId && contractAddress && price) {
      writeContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: "purchaseItem",
        args: [BigInt(currentNft.itemId)],
        value: parseEther(price.toString())
      });
    }
  }

  // Use the useWaitForTransactionReceipt hook to wait for the transaction to be mined and return loading and success states
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isError) {
      toast.error(`RWA has not been purchase`);
    }
    if (currentNft && isSuccess && user.infos?.id && currentNft.id) {
      toast.success('RWA has been purchase, congrats !');
      const createRwaOrderAndUpdateNft = async () => {
        try {
          /*
          const txReceipt = await publicClient.getTransactionReceipt({ hash: props.hash })
          
          const hexDataEventBought = txReceipt.logs[1].data
          const itemId = parseInt(hexDataEventBought.slice(2, 66), 16)
          console.log('itemId : ', itemId)
          const tokenId = parseInt(hexDataEventBought.slice(66, 130), 16)
          console.log('tokenId : ', tokenId)
          const price = parseInt(hexDataEventBought.slice(130, 194), 16) 
          console.log('tokenId : ', price)
          const priceInEther = formatUnits(BigInt(price), 18)
          */
          //STEP 1 : Create record in Transaction table
          const transactionData: TransactionData = {
            tokenId: currentNft.tokenId as number,
            contractAddress: contractAddress as Address,
            functionName: 'purchaseItem',
            from: address as Address,
            to: marketplaceAddress,
            transferFrom: address as Address,
            transferTo: marketplaceAddress,
            price: currentNftInfos.price,
            transactionHash: hash || '0x'
          }
          await createTransactionData(transactionData)

          //STEP 2 : Create record in Order table
          await createOrder({
            userId: user.infos?.id as string,
            nftId: currentNft.id as number
          })

          //STEP 3 : Update ResourceNft record
          await updateNft({
            transactionHash: hash,
            owner: address,
            status: ResourceNftStatuses.SOLD,
            purchasedOnce: true,
            previousOwner: ''
          }, currentNft.id as number)
          dispatch(updateNftById({ nftId: currentNft.id as NftId, status: ResourceNftStatuses.SOLD, purchasedOnce: true }))
        }
        catch (err) {
          console.error("Create Order", err);
        }
      };
      createRwaOrderAndUpdateNft()
    }
  }, [isSuccess])



  return (<Modal
    title={success ? 'Acquisition confirmed 🥳' : currentNft?.name || ''}
    show={isModalDisplay}
    hide={() => dispatch(closeModal())}
    disabledClosing={isLoading}
  >
    {success || isSuccess ? (
      <BuyModalSuccessfulContent
        {...currentNft}
        isLoading={false}
        hide={() => dispatch(closeModal())}
        contractAddress={contractAddress}
      />
    ) : (
      <BuyModalContent
        {...currentNft}
        isLoading={isLoading}
        purchaseItem={!isConnected ? openConnectModal : !user.infos ? () => dispatch(setLoginModalDisplay(true)) : () => purchaseItem()}
        hide={() => dispatch(closeModal())}
        price={Number(price.toFixed(6))}
      />
    )}
  </Modal>)
}

export default BuyModal;
