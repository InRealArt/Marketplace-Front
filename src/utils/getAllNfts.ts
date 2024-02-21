import { useState, useEffect } from 'react';
import { Alchemy, Network, OwnedNft } from 'alchemy-sdk';

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

export function useNftOwned(ownerAdress: string): {
  nftsOwned: OwnedNft[];
  loading: boolean;
  error: Error | null;
} {
  const [nftsOwned, setNftsOwned] = useState<OwnedNft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getEthPrice() {
      try {
        const nfts = await alchemy.nft.getNftsForOwner(ownerAdress);
        setNftsOwned(nfts?.ownedNfts);
        setLoading(false);
      } catch (error: any) {
        if (error.name === 'AbortError') return;
        setError(error);
        setLoading(false);
      }
    }
    getEthPrice();
  }, [ownerAdress]);

  return { nftsOwned, loading, error };
}
