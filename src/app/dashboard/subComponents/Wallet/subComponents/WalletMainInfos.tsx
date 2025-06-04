import { ChevronLeft, ChevronRightIcon, LucideListOrdered } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ResourceNftStatuses } from '@prisma/client';
import Button from '@/components/Button/Button';
import { TransactionData, fetchTransactionsByAddress } from '@/lib/transactions';
import { Address } from 'viem';
import { useItemsStore } from '@/store/itemsStore';

interface WalletTransactionHistoryProps {
  address: Address
  setShowTransactions: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletTransactionHistory = ({ address, setShowTransactions }: WalletTransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await fetchTransactionsByAddress(address);
      // Transform data to match TransactionData type
      const transformedData = data.map((transaction: any) => ({
        ...transaction,
        contractAddress: transaction.contractAddress as `0x${string}` | null
      }));
      setTransactions(transformedData);
    };
    fetchTransactions();
  }, [address]);

  return (
    <div className="WalletTransactionHistory">
      <div className="WalletTransactionHistory__header">
        <ChevronLeft onClick={() => setShowTransactions(false)} />
        <h2>Transaction History</h2>
      </div>
      <div className="WalletTransactionHistory__list">
        {transactions.map((transaction, index) => (
          <div key={index} className="WalletTransactionHistory__item">
            <p>{transaction.functionName}</p>
            <p>{transaction.price?.toString()} €</p>
            <p>{transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const WalletMainInfos = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { getCommunautaryNfts } = useItemsStore();
  const [showTransactions, setShowTransactions] = useState(false);
  
  const nfts = getCommunautaryNfts();
  const nftsOwned = nfts.filter(nft => (nft as any).owner === address);
  const nftsListedOwned = nfts.filter(nft => ((nft as any).previousOwner === address && (nft as any).status === 'LISTED'));
  const nftsOwnedTotal = [...nftsOwned, ...nftsListedOwned];

  if (showTransactions && address) return <WalletTransactionHistory address={address} setShowTransactions={setShowTransactions} />;

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
