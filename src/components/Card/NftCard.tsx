import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FlameIcon } from 'lucide-react';
import { toast } from 'sonner';

import Button from '../Button/Button';

// BLOCKCHAIN
import { marketplaceAddress } from '@/utils/constants';

import {
  useWaitForTransactionReceipt,
  useAccount,
  useWriteContract,
  useReadContract,
} from 'wagmi';

import {
  useConnectModal,
  useAddRecentTransaction,
} from '@rainbow-me/rainbowkit';
import BuyModal from '../Modal/BuyModal';
import { NftType } from '@/types';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { Address, parseEther } from 'viem';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCollectionById } from '@/redux/reducers/collections/selectors';
import { IraIERC721Abi } from '@/web3/IraIERC721Abi';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { getImageFromUri } from '@/utils/getImageFromUri';

interface NftCardProps {
  nft: NftType;
}

const NftCard = ({ nft }: NftCardProps) => {
  const { itemId, tokenId, collectionId, name } = nft;
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [showNftModal, setShowNftModal] = useState<boolean>(false);

  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { data: hash, writeContract, error, isError } = useWriteContract();
  const collection = useAppSelector((state) => getCollectionById(state, collectionId || 0))
  const artist = useAppSelector((state) => getArtistByNft(state, nft.collectionId || 0))
  const user = useAppSelector((state) => getUserInfos(state))
  const dispatch = useAppDispatch()

  const { data: nftInfo } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "getItem",
    args: [BigInt(nft?.itemId || 0)]
  });

  const { data: isSold } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "isSold",
    args: [BigInt(nft?.itemId || 0)]
  });

  const { data: ownerOf } = useReadContract({
    abi: IraIERC721Abi,
    address: collection?.contractAddress as Address,
    functionName: "ownerOf",
    args: [BigInt(nft?.tokenId || 0)]
  });

  const purchaseItem = () => {
    if (itemId && tokenId && collection && nftInfo?.price) {
      writeContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: "purchaseItem",
        args: [BigInt(itemId)],
        value: parseEther(nftInfo.price.toString())
      });
    }
  }
  // Use the useWaitForTransactionReceipt hook to wait for the transaction to be mined and return loading and success states
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    if (isSuccess) {
      toast.success('NFT has been purchase, congrats !');
      if (hash) {
        addRecentTransaction({ hash, description: name || 'NFT' });
      }
    }
    if (isError) {
      toast.error(`NFT has not been purchase ${error}`);
    }
  }, [isSuccess, isError]);
  console.log(nftInfo, isSold);
  

  const isNftOwned = isConnected && ownerOf === address

  if (!nft.tokenId || !collection?.contractAddress || !nftInfo) return null

  return (
    <div className="NftCard">
      <Link className="NftCard__image" href={`/nfts/${nft.id}`}>
        <picture className="NftCard__picture">
          {nft.imageUri && <Image className='NftCard__img' alt={nft.name} width={300} height={300} src={getImageFromUri(nft.imageUri)} />}
        </picture>
        <div className="NftCard__likes">
          <FlameIcon width={23} height={23} /> <span>Famous artist</span>
        </div>
      </Link>
      <div className="NftCard__bottom">
        <div className="NftCard__infos">
          <div className="NftCard__bio">
            <Link className="NftCard__artist" href={`/artists/${artist?.id}`}>
              {artist?.pseudo}
            </Link>
            <Link className="NftCard__title" href={`/nfts/${nft.id}`}>
              {name}
            </Link>
          </div>
          <div className="NftCard__price">
            <Image
              className=""
              priority={true}
              alt="ether"
              src="/icons/Ether.png"
              width={60}
              height={60}
            />{' '}
            {Number(nftInfo?.price)}
          </div>

        </div>
        {(isNftOwned) ? (
          <Button
            action={() => {
              setShowBuyModal(true)
              setShowNftModal(true)
            }}
            text="View my NFT"
            additionalClassName="purple"
          />
        ) : <Button
          action={() => setShowBuyModal(true)}
          text={`${isSold ? "SOLD" : "Buy now"}`}
          additionalClassName={`${isSold ? "purple" : "gold"}`}
          disabled={isSold}
        />
        }
      </div>


      <BuyModal
        {...nft}
        pseudo={artist?.pseudo}
        artistId={artist?.id}
        price={Number(nftInfo.price)}
        buy={!isConnected ? openConnectModal : !user.infos ? () => dispatch(setLoginModalDisplay(true)) : () => purchaseItem()}
        isMinting={isLoading}
        showBuyModal={showBuyModal}
        hide={() => setShowBuyModal(false)}
        isSuccess={isSuccess}
        showNftModal={showNftModal}
        contractAddress={collection?.contractAddress as Address}
      />
    </div>
  );
};

export default NftCard;
