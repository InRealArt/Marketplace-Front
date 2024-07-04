
import { fetchArtists } from '@/lib/artists'
import { fetchCollections } from '@/lib/collections'
import { getNftsByStatus, getNftsByStatusAndPurchasedOnce } from '@/lib/nfts'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setArtists } from '@/redux/reducers/artists/reducer'
import { getArtists, getGalleries } from '@/redux/reducers/artists/selectors'
import { setCollections } from '@/redux/reducers/collections/reducer'
import { getCollections } from '@/redux/reducers/collections/selectors'
import { setCommunautaryNfts, setNfts } from '@/redux/reducers/nfts/reducer'
import { getCommunautaryNfts, getNfts, getNftsByArtist } from '@/redux/reducers/nfts/selectors'
import { ArtistId, NftType } from '@/types'
import { IraIERC721Abi } from '@/web3/IraIERC721Abi'
import { ResourceNftStatuses } from '@prisma/client'
import { useEffect } from 'react'
import { readContract } from '@wagmi/core'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { wagmiConfig } from '@/app/providers'

const useFetchData = (artistId?: ArtistId) => {
  const { address, isConnected } = useAccount()
  const nfts = useAppSelector((state) => getNfts(state))
  const communautaryNfts = useAppSelector((state) => getCommunautaryNfts(state))
  const artists = useAppSelector((state) => getArtists(state))
  const galleries = useAppSelector((state) => getGalleries(state))

  const collections = useAppSelector((state) => getCollections(state))
  const nftsByArtist = useAppSelector((state) => getNftsByArtist(state, artistId || 0)) 

  const dispatch = useAppDispatch()

  const fetchNfts = async () => {
    //NFTs in the "IRA Testnet" tab
    let nfts = await getNftsByStatus([ResourceNftStatuses.LISTED, ResourceNftStatuses.SOLD])
    
    nfts = nfts.filter((nft: any) => {
      return (!nft.purchasedOnce || (nft.purchasedOnce && address == nft.owner))
    })
    // console.log('NFT count ', nfts.length)
    dispatch(setNfts(nfts));
  }

  const fetchCommunautaryNfts = async () => {
    //NFTs in the "Communautary Artworks" tab
    let communautaryNfts = await getNftsByStatus([ResourceNftStatuses.LISTED, ResourceNftStatuses.SOLD])
    communautaryNfts = communautaryNfts.filter((nft: any) => {
      return nft.purchasedOnce
    })
    // console.log('communautaryNfts count ', communautaryNfts.length)
    dispatch(setCommunautaryNfts(communautaryNfts));
  }
    

  const fetchArtistsData = async () => {
    const artists = await fetchArtists()
    dispatch(setArtists(artists));
  };

  const fetchCollectionsData = async () => {
    const collections = await fetchCollections()
    dispatch(setCollections(collections));
  };

  useEffect(() => {
    if (collections.length === 0) {
      fetchCollectionsData()
    }
    if (artists.length === 0) {
      fetchArtistsData()
    }
    if (nfts.length === 0) {      
      fetchNfts()
    }
    if (communautaryNfts.length === 0) {      
      fetchCommunautaryNfts()
    }

  }, [[artists, nfts, communautaryNfts, collections]])

  const refetch = () => {
    fetchCollectionsData()
    fetchNfts()
    fetchCommunautaryNfts()
  }

  return { artists, nfts, communautaryNfts, collections, nftsByArtist, galleries, refetch }
}

export default useFetchData