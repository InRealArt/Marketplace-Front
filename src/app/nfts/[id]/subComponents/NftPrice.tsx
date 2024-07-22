'use client';
import React, { useEffect } from 'react';
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
import { useAppDispatch } from '@/redux/hooks';
import { ResourceNftStatuses } from '@prisma/client';
import { setModalInfos } from '@/redux/reducers/nfts/reducer';
import useCheckNetwork from '@/customHooks/useCheckNetwork';

interface NftPriceProps {
  nft: Partial<NftType>
  contractAddress: Address
}

const NftPrice = ({ nft, contractAddress }: NftPriceProps) => {

  const dispatch = useAppDispatch()

  const { isConnected, address } = useAccount();
  const wrongNetwork = useCheckNetwork();

  const { data: nftTotalPrice } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "getTotalPrice",
    args: [BigInt(nft?.itemId || 0)]
  });
  
  const nftTotalPrice_ = Number(nftTotalPrice) * Math.pow(10, -18) < 0.000001 ? 0.000001 : Number(nftTotalPrice) * Math.pow(10, -18)

  const { data: ownerOf } = useReadContract({
    abi: IraIERC721Abi,
    address: contractAddress as Address,
    functionName: "ownerOf",
    args: [BigInt(nft?.tokenId || 0)]
  });

  const { data: nftInfo } = useReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "getItem",
    args: [BigInt(nft?.itemId || 0)]
  });

  const isNftOwned = isConnected && ownerOf === address
  const isNftSeller = isConnected && nftInfo?.seller === address
  const isSold = (nft.status === ResourceNftStatuses.SOLD) || nftInfo?.sold
  const textButton = isSold ? "SOLD" : (isNftSeller ? "Cancel sell" : "Buy now")

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
        <p className="Nft__ethPrice">{nftTotalPrice_} ETH</p>
      </div>
      <div className="Nft__price__btns">
        {(isNftOwned) && (
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
            disabled={wrongNetwork}
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
            disabled={isSold || wrongNetwork}
          />}
      </div>
    </div>
  );
};

export default NftPrice;
