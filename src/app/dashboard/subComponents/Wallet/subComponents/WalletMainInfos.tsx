import { useAppSelector } from '@/redux/hooks';
import { getNfts } from '@/redux/reducers/nfts/selectors';
import { ChevronRightIcon, LucideListOrdered } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';


const WalletMainInfos = () => {
  const { openAccountModal } = useAccountModal()
  const { address } = useAccount()

  const nfts = useAppSelector((state) => getNfts(state))
  const nftsOwned = nfts.filter(nft => nft.owner === address)
  return (
    <section className="WalletMainInfos">
      <div className="WalletMainInfos__item">
        <Image
          priority={true}
          alt="My NFT"
          src="/icons/NftIcon.svg"
          width={48}
          height={48}
        />
        <div className="WalletMainInfos__infos">
          <h2>NFT Total</h2>
          <p className="WalletMainInfos__infos--value">{nftsOwned.length}</p>
        </div>
      </div>
      <div className="WalletMainInfos__item WalletMainInfos__item--cursor" onClick={openAccountModal}>
        <LucideListOrdered width={40} height={40} />
        <div className="WalletMainInfos__infos">
          <h2>Mes operations</h2>
        </div>
        <ChevronRightIcon className="WalletMainInfos__rightIcon" width={40} height={40} />
      </div>
    </section>
  );
};

export default WalletMainInfos;
