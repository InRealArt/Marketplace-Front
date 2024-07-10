import { useAppSelector } from '@/redux/hooks';
import { getCommunautaryNfts } from '@/redux/reducers/nfts/selectors';
import { ChevronRightIcon, LucideListOrdered } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { ResourceNftStatuses } from '@prisma/client';
import Button from '@/components/Button/Button';

const WalletMainInfos = () => {
  const { openAccountModal } = useAccountModal()
  const { address, } = useAccount()
  const { disconnect } = useDisconnect()

  const nfts = useAppSelector((state) => getCommunautaryNfts(state))

  //Les NFTs des users sont les NFT dont le champ "owner" est valorisé à l'adresse du wallet Metamask connecté 
  // Ces Nfts sont forcément au statut 'SOLD'
  //Il faut ajouter à ces NFT ceux qui ont été listé par le vendeur sur la MarketPlace donc ceux qui respectent les critéres : 
  //  statut = LISTED & previousOwner = currentWallet
  const nftsOwned = nfts.filter(nft => nft.owner === address)
  //console.log('nftsOwned : ', nftsOwned)
  const nftsListedOwned = nfts.filter(nft => (nft.previousOwner === address && nft.status == ResourceNftStatuses.LISTED))
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
          <h2>Total Artworks bought</h2>
          <p className="WalletMainInfos__infos--value">{nftsOwnedTotal.length}</p>
        </div>
      </div>
      <div className="WalletMainInfos__item WalletMainInfos__item--cursor" onClick={openAccountModal}>
        <LucideListOrdered width={40} height={40} />
        <div className="WalletMainInfos__infos">
          <h2>My operations</h2>
        </div>
        <ChevronRightIcon className="WalletMainInfos__rightIcon" width={40} height={40} />
      </div>
      <Button
        text='Disconnet Wallet'
        additionalClassName='logout'
        action={() => disconnect()}
      />
    </section>
  );
};

export default WalletMainInfos;
