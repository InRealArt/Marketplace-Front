import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCommunautaryNfts, getNfts } from '@/redux/reducers/nfts/selectors';
import { ChevronRightIcon, LucideListOrdered } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import useFetchData from '@/customHooks/useFetchData';
import { ResourceNftStatuses } from '@prisma/client';

const WalletMainInfos = () => {
  const { openAccountModal } = useAccountModal()
  const { address } = useAccount()
  
  const nfts = useAppSelector((state) => getCommunautaryNfts(state))

  //Les NFTs des users sont les NFT dont le champ "owner" est valorisé à l'adresse du wallet Metamask connecté 
  // Ces Nfts sont forcément au statut 'SOLD'
  //Il faut ajouter à ces NFT ceux qui ont été listé par le vendeur sur la MarketPlace donc ceux qui respectent les critéres : 
  //  statut = LISTED & previousOwner = currentWallet
  const nftsOwned = nfts.filter(nft => nft.owner === address)
  //console.log('nftsOwned : ', nftsOwned)
  const nftsListedOwned = nfts.filter(nft => (nft.previousOwner === address && nft.status == ResourceNftStatuses.LISTED) )
  //console.log('nftsListedOwned : ', nftsListedOwned)
  const nftsOwnedTotal = [...nftsOwned, ...nftsListedOwned]
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
          <p className="WalletMainInfos__infos--value">{nftsOwnedTotal.length}</p>
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
