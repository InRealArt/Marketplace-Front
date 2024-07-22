import { useAppSelector } from '@/redux/hooks';
import { getCommunautaryNfts } from '@/redux/reducers/nfts/selectors';
import { ChevronLeft, ChevronRightIcon, LucideListOrdered } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ResourceNftStatuses } from '@prisma/client';
import Button from '@/components/Button/Button';
import { TransactionData, fetchTransactionsByAddress } from '@/lib/transactions';
import { Address } from 'viem';

interface WalletTransactionHistoryProps {
  address: Address
  setShowTransactions: React.Dispatch<React.SetStateAction<boolean>>
}
const WalletTransactionHistory = ({ setShowTransactions, address }: WalletTransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<TransactionData[]>();
  const fetchTransactionsData = async () => {
    const transactionsByNft = await fetchTransactionsByAddress(address as Address)
    setTransactions(transactionsByNft as TransactionData[])
  };

  useEffect(() => {
    fetchTransactionsData()
  }, [])
  return (
    <section className='WalletTransactionHistory'>
      <ChevronLeft className='WalletTransactionHistory__icon' width={40} height={40} onClick={() => setShowTransactions(false)} />
      {transactions?.map(transaction => (
        <div key={transaction.transactionHash} className='WalletTransactionHistory__item'>
          <p>{transaction.created_at?.toLocaleDateString()} {transaction.created_at?.toLocaleTimeString()}</p>
          <p>Type: {transaction.functionName}</p>
          <a className='WalletTransactionHistory__item--link' target='_blank' href={`https://sepolia.etherscan.io/tx/${transaction.transactionHash}`}>See transaction</a>
        </div>
      ))}
    </section>
  )
}
const WalletMainInfos = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const nfts = useAppSelector((state) => getCommunautaryNfts(state))
  const [showTransactions, setShowTransactions] = useState(false)
  //Les NFTs des users sont les NFT dont le champ "owner" est valorisé à l'adresse du wallet Metamask connecté 
  // Ces Nfts sont forcément au statut 'SOLD'
  //Il faut ajouter à ces NFT ceux qui ont été listé par le vendeur sur la MarketPlace donc ceux qui respectent les critéres : 
  //  statut = LISTED & previousOwner = currentWallet
  const nftsOwned = nfts.filter(nft => nft.owner === address)
  const nftsListedOwned = nfts.filter(nft => (nft.previousOwner === address && nft.status == ResourceNftStatuses.LISTED))
  const nftsOwnedTotal = [...nftsOwned, ...nftsListedOwned]

  if (showTransactions && address) return <WalletTransactionHistory address={address} setShowTransactions={setShowTransactions} />

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
      <div className="WalletMainInfos__item WalletMainInfos__item--cursor" onClick={() => setShowTransactions(true)}>
        <LucideListOrdered width={40} height={40} />
        <div className="WalletMainInfos__infos">
          <h2>My transactions history</h2>
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
