// import { useState, useEffect } from 'react';
// import { Alchemy, Network, OwnedNft } from 'alchemy-sdk';
// import { useAppSelector } from '@/redux/hooks';
// import { getNftsByStatus } from '@/lib/nfts';
// import { ResourceNftStatuses } from '@prisma/client';
// import { getNfts } from '@/redux/reducers/nfts/selectors';
// import { useReadContract } from 'wagmi';

// const config = {
//   apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
//   network: Network.ETH_SEPOLIA,
// };
// const alchemy = new Alchemy(config);

// export function useNftOwned(ownerAdress: string): {
//   nftsOwned: OwnedNft[];
//   loading: boolean;
//   error: Error | null;
// } {
//   const [nftsOwned, setNftsOwned] = useState<OwnedNft[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   // const { data: nftInfo } = useReadContract({
//   //   abi: marketplaceAbi,
//   //   address: marketplaceAddress,
//   //   functionName: "getItem",
//   //   args: [BigInt(nft?.itemId || 0)]
//   // });

//   // const { data: ownerOf } = useReadContract({
//   //   abi: IraIERC721Abi,
//   //   address: collection?.contractAddress as Address,
//   //   functionName: "ownerOf",
//   //   args: [BigInt(nft?.tokenId || 0)]
//   // });
//   useEffect(() => {
//     async function getAllNfts() {
//       try {
//         const nfts = await alchemy.nft.getNftsForOwner(ownerAdress);
//         setNftsOwned(nfts?.ownedNfts);
//         setLoading(false);
//       } catch (error: any) {
//         if (error.name === 'AbortError') return;
//         setError(error);
//         setLoading(false);
//       }
//     }
//     getAllNfts();
//   }, [ownerAdress]);

//   return { nftsOwned, loading, error };
// }
