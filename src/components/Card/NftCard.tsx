import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FlameIcon } from 'lucide-react';

import Button from '../Button/Button';

// BLOCKCHAIN
import { marketplaceAddress } from '@/utils/constants';

import {
  useAccount,
  useReadContract,
} from 'wagmi';

import { ModalType, NftType } from '@/types';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { Address } from 'viem';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCollectionById } from '@/redux/reducers/collections/selectors';
import { IraIERC721Abi } from '@/web3/IraIERC721Abi';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';
import { getImageFromUri } from '@/utils/getImageFromUri';
import { ResourceNftStatuses } from '@prisma/client';
import { setModalInfos } from '@/redux/reducers/nfts/reducer';

interface NftCardProps {
  nft: NftType;
}

const NftCard = ({ nft }: NftCardProps) => {
  const { collectionId, name } = nft;

  const { isConnected, address } = useAccount();
  const collection = useAppSelector((state) => getCollectionById(state, collectionId || 0))
  const artist = useAppSelector((state) => getArtistByNft(state, nft.collectionId || 0))
  const dispatch = useAppDispatch()

  const { data: nftInfo, refetch } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "getItem",
    args: [BigInt(nft?.itemId || 0)]
  });

  const { data: nftTotalPrice } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "getTotalPrice",
    args: [BigInt(nft?.itemId || 0)]
  });
  const nftTotalPrice_ = Number(nftTotalPrice) * Math.pow(10, -18) < 0.000001 ? 0.000001 : Number(nftTotalPrice) * Math.pow(10, -18)
  const isSold = (nft.status === ResourceNftStatuses.SOLD) || nftInfo?.sold

  const { data: ownerOf } = useReadContract({
    abi: IraIERC721Abi,
    address: collection?.contractAddress as Address,
    functionName: "ownerOf",
    args: [BigInt(nft?.tokenId || 0)]
  });

  const isNftOwned = isConnected && ownerOf === address
  const isNftSeller = isConnected && nftInfo?.seller === address

  if (!nft.tokenId || !collection?.contractAddress || !nftInfo) return null
  const textButton = isSold ? "SOLD" : (isNftSeller ? "Cancel sell" : "Buy now")
  console.log(nft.tokenId, nftInfo?.seller);

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
            {/* <span className="NftCard__title">#{nft.tokenId}</span> */}
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
            <p>{nftTotalPrice_}</p>
          </div>

        </div>
        {(isNftSeller) ? (
          <Button
            action={() => {
              dispatch(setModalInfos({
                nft,
                modalType: ModalType.SELL,
                contractAddress: collection?.contractAddress as Address,
                price: nftTotalPrice_,
                success: true
              }))
            }}
            text={`${textButton}`}
            additionalClassName="purple"
          />
        ) : isNftOwned ? <Button
          action={() => {
            dispatch(setModalInfos({
              nft,
              modalType: ModalType.SELL,
              contractAddress: collection?.contractAddress as Address,
              price: nftTotalPrice_,
              success: false
            }))
          }}
          text="Sell my RWA"
          additionalClassName="purple"
        /> :
          <Button
            action={() => {
              dispatch(setModalInfos({
                nft,
                modalType: ModalType.BUY,
                contractAddress: collection?.contractAddress as Address,
                price: nftTotalPrice_,
                success: false
              }))
            }}
            text={`${textButton}`}
            additionalClassName={`${isSold ? "purple" : "gold"}`}
            disabled={isSold}
          />}
      </div>
    </div>
  );
};

export default NftCard;
