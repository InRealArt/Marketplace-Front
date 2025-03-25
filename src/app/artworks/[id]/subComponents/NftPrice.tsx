'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import BuyModal from '@/components/Modal/BuyModal';

// BLOCKCHAIN
import { marketplaceAddress } from '@/utils/constants';

import {
  useAccount,
  useReadContract,
} from 'wagmi'; 

import { ModalType, NftType } from '@/types';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { IraIERC721Abi } from '@/web3/IraIERC721Abi';
import { Address } from 'viem';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ResourceNftStatuses } from '@prisma/client';
import { setModalInfos } from '@/redux/reducers/nfts/reducer';
import Link from 'next/link';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import { setBasketInfos } from '@/redux/reducers/basket/reducer';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';

interface NftPriceProps {
  nft: NftType
  contractAddress: Address
}

const NftPrice = ({ nft, contractAddress }: NftPriceProps) => {
  const dispatch = useAppDispatch()
  const artist = useAppSelector((state) => getArtistByNft(state, nft.collectionId || 0))

  // const { isConnected, address } = useAccount();

  // const { data: nftTotalPrice } = useReadContract({
  //   abi: marketplaceAbi,
  //   address: marketplaceAddress,
  //   functionName: "getTotalPrice",
  //   args: [BigInt(nft?.itemId || 0)]
  // });

  // const nftTotalPrice_ = Number(nftTotalPrice) * Math.pow(10, -18) < 0.000001 ? 0.000001 : Number(nftTotalPrice) * Math.pow(10, -18)

  // const { data: ownerOf } = useReadContract({
  //   abi: IraIERC721Abi,
  //   address: contractAddress as Address,
  //   functionName: "ownerOf",
  //   args: [BigInt(nft?.tokenId || 0)]
  // });

  // const { data: nftInfo } = useReadContract({
  //   abi: marketplaceAbi,
  //   address: marketplaceAddress,
  //   functionName: "getItem",
  //   args: [BigInt(nft?.itemId || 0)]
  // });

  // const isNftOwned = isConnected && ownerOf === address
  // const isNftSeller = isConnected && nftInfo?.seller === address
  // const isSold = (nft.status === ResourceNftStatuses.SOLD) || nftInfo?.sold
  // const textButton = isSold ? "SOLD" : (isNftSeller ? "Cancel sell" : "Buy now")

  const setCheckoutInfos = () => {
    if (nft.id) {
      dispatch(setBasketInfos({
        id: nft.id ,
        title: nft.name,
        description: nft.description,
        price: nft.price ?? 0,
        image: nft.imageUri,
        artist: {id: artist?.id.toString(), name: artist?.pseudo}
      }))
    }
  }
  return (
    <div className="Nft__price">
      <div className="Nft__price__content">
        <Image
          priority={true}
          className="Nft__ethLogo"
          alt="ETH logo"
          src="/icons/EtherWhite.png"
          width={34}
          height={34}
        />
        <p className="Nft__ethPrice">{100000} euros</p>
      </div>
      <div className="Nft__price__btns">
        <Button
          text='Buy now'
          link='/checkout'
          additionalClassName='gold'
          action={setCheckoutInfos}
        />
        {/* {(isNftOwned) && (
          <Button
            action={() => {
              dispatch(setModalInfos({
                nft,
                modalType: ModalType.BUY,
                contractAddress: contractAddress as Address,
                price: nftTotalPrice_,
                success: true
              }))
            }}
            text="View my RWA"
            additionalClassName="purple"
          />
        )}
        {(isNftOwned) ? (
          <Button
            action={() => {
              dispatch(setModalInfos({
                nft,
                modalType: ModalType.SELL,
                contractAddress: contractAddress as Address,
                price: nftTotalPrice_,
                success: false
              }))
            }}
            text="Sell my RWA"
            additionalClassName="gold"
          />
        ) : isNftSeller ? <Button
          action={() => {
            dispatch(setModalInfos({
              nft,
              modalType: ModalType.SELL,
              contractAddress: contractAddress as Address,
              price: nftTotalPrice_,
              success: true
            }))
          }}
          text={`${textButton}`}
          additionalClassName="purple"
        /> :
          <Button
            action={() => dispatch(setModalInfos({
              nft,
              modalType: ModalType.BUY,
              contractAddress: contractAddress as Address,
              price: nftTotalPrice_,
              success: false
            }))}
            text={`${textButton}`}
            additionalClassName={`${isSold ? "purple" : "gold"}`}
            disabled={isSold}
          />} */}
      </div>
    </div>
  );
};

export default NftPrice;
