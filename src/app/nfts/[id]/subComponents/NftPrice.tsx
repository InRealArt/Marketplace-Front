'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import BuyModal from '@/components/Modal/BuyModal';

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
import { toast } from 'sonner';
import { NftType } from '@/types';
import { marketplaceAbi } from '@/web3/IraMarketplaceAbi';
import { IraIERC721Abi } from '@/web3/IraIERC721Abi';
import { Address, parseEther } from 'viem';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getArtistByNft } from '@/redux/reducers/artists/selectors';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';

interface NftPriceProps {
  nft: Partial<NftType>
  sold: boolean | undefined
  contractAddress: Address
}

const NftPrice = ({ nft, sold, contractAddress }: NftPriceProps) => {
  const { price, itemId, tokenId, name } = nft;
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [showNftModal, setShowNftModal] = useState<boolean>(false);
  const artist = useAppSelector((state) => getArtistByNft(state, nft.collectionId || 0))
  const user = useAppSelector((state) => getUserInfos(state))

  const dispatch = useAppDispatch()

  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { data: hash, writeContract, error, isError } = useWriteContract();

  const nftPrice = Number(price) * Math.pow(10, -18) < 0.001 ? 0.001 : Number(price) * Math.pow(10, -18)

  const purchaseItem = () => {
    if (itemId && tokenId && price) {
      writeContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: "purchaseItem",
        args: [BigInt(itemId)],
        value: parseEther(nftPrice.toString())
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
      toast.success('NFT has been purchase congrats');
      if (hash) {
        addRecentTransaction({ hash, description: name || 'NFT' });
      }
    }
    if (isError) {
      toast.error(`NFT has not been purchase ${error}`);
    }
  }, [isSuccess, isError]);

  const { data: ownerOf } = useReadContract({
    abi: IraIERC721Abi,
    address: contractAddress as Address,
    functionName: "ownerOf",
    args: [BigInt(nft?.tokenId || 0)]
  });

  const isNftOwned = isConnected && ownerOf === address

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
        <p className="Nft__ethPrice">{nftPrice} ETH</p>
      </div>
      <div className="Nft__price__btns">
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
          text={`${sold ? "SOLD" : "Buy now"}`}
          additionalClassName={`${sold ? "purple" : "gold"}`}
          disabled // ={sold || isError}
        />
        }
        {(isNftOwned && sold) ? <Button
          action={() => {}}
          text="Sell my NFT"
          disabled
          additionalClassName="gold"
        /> : null}
        <BuyModal
          {...nft}
          pseudo={artist?.pseudo}
          artistId={artist?.id}
          price={nftPrice || 0}
          buy={!isConnected ? openConnectModal : !user.infos ? () => dispatch(setLoginModalDisplay(true)) : () => purchaseItem()}
          isBuying={isLoading}
          showBuyModal={showBuyModal}
          hide={() => setShowBuyModal(false)}
          isSuccess={isSuccess}
          showNftModal={showNftModal}
          contractAddress={contractAddress}
          hash={hash as Address}
        />
      </div>
    </div>
  );
};

export default NftPrice;
