'use client';
import React, { useEffect, useState } from 'react';
import { Nft } from '@/mocks/types';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import BuyModal from '@/components/Modal/BuyModal';

// BLOCKCHAIN
import { contractAdress, abi } from '@/utils/constants';

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from 'wagmi';

import {
  useConnectModal,
  useAddRecentTransaction,
} from '@rainbow-me/rainbowkit';
import { Toaster, toast } from 'sonner';

const NftPrice = (props: Partial<Nft>) => {
  const { price, name } = props;
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);

  const tokenUri =
    'https://marketplace-front-ten.vercel.app/_next/static/media/Nft.6f559b8a.png';
  const NFT = [
    'Leloluce NFT',
    'Leloluce NFT Description',
    'Leloluce Cert Auth URL',
    ['Tag1LELO', 'Tag2Tag1LELO'],
    ['Permission1Tag1LELO', 'Permission2Tag1LELO'],
    100,
    100,
    true,
    12,
  ];

  const recipients = [
    '0xe37EdEa065cbe405D10A0D717238177438339c16',
    '0x0A67E0d0Fb4c41DEFe81924e60445a4584750663',
  ];

  const percent = [50, 50];
  const totalPercent = 120;

  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { config } = usePrepareContractWrite({
    address: contractAdress,
    abi: abi,
    functionName: 'mintNFT',
    args: [tokenUri, NFT, recipients, percent, totalPercent],
  });

  const { data, write } = useContractWrite(config);

  // Use the useWaitForTransaction hook to wait for the transaction to be mined and return loading and success states
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  const addRecentTransaction = useAddRecentTransaction();

  useEffect(() => {
    if (isSuccess) {
      toast.success('NFT has been mint');
      setShowBuyModal(false);
      if (data?.hash) {
        addRecentTransaction({ hash: data.hash, description: name || 'NFT' });
      }
    }
    if (isError) {
      toast.error('NFT has not been mint');
    }
  }, [isSuccess, isError, data?.hash, name, addRecentTransaction]);

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
        <p className="Nft__ethPrice">{price} ETH</p>
      </div>
      <div className="Nft__price__btns">
        <Button
          action={() => setShowBuyModal(true)}
          text={isLoading ? 'Minting...' : 'Buy now'}
          additionalClassName="gold"
        />
        <Toaster richColors />
        <BuyModal
          {...props}
          buy={isConnected ? () => write?.() : openConnectModal}
          isMinting={isLoading}
          showBuyModal={showBuyModal}
          setShowBuyModal={setShowBuyModal}
        />
      </div>
    </div>
  );
};

export default NftPrice;
