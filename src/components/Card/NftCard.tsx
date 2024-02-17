import React, { useEffect, useState } from 'react';
import { Nft } from '@/mocks/types';
import Button from '../Button/Button';
import NftImage from '../../../public/images/Nft.png';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Toaster, toast } from 'sonner';

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
import BuyModal from '../Modal/BuyModal';

interface NftCardProps {
  nft: Nft;
}

const NftCard = ({ nft }: NftCardProps) => {
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const { id, name, artist, price, likes } = nft;

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
        addRecentTransaction({ hash: data.hash, description: name });
      }
    }
    if (isError) {
      toast.error('NFT has not been mint');
    }
  }, [isSuccess, isError, data?.hash, name, addRecentTransaction]);

  return (
    <div className="NftCard">
      <Link href={`/nfts/${id}`}>
        <div
          className="NftCard__background"
          style={{
            backgroundImage: ` url('${NftImage.src}')`,
          }}
        >
          <div className="NftCard__likes">
            <Heart width={23} height={23} /> <span>{likes} likes</span>
          </div>
        </div>
      </Link>
      <div className="NftCard__infos">
        <div>
          <Link className="NftCard__artist" href={`/artists/${artist?.id}`}>
            {artist?.name}
          </Link>
          <Link className="NftCard__title" href={`/nfts/${id}`}>
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
          {price}
        </div>
      </div>
      <Button
        action={() => setShowBuyModal(true)}
        additionalClassName="gold"
        text={isLoading ? 'Minting...' : 'Buy'}
      />
      <Toaster richColors />

      <BuyModal
        name={nft.name}
        price={nft.price}
        artist={nft.artist}
        buy={isConnected ? () => write?.() : openConnectModal}
        isMinting={isLoading}
        showBuyModal={showBuyModal}
        setShowBuyModal={setShowBuyModal}
      />
    </div>
  );
};

export default NftCard;
