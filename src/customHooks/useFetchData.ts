
import { fetchArtists } from '@/lib/artists'
import { fetchCollections } from '@/lib/collections'
import { getNftsByStatus } from '@/lib/nfts'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setArtists } from '@/redux/reducers/artists/reducer'
import { getArtists, getGalleries } from '@/redux/reducers/artists/selectors'
import { setCollections } from '@/redux/reducers/collections/reducer'
import { getCollections } from '@/redux/reducers/collections/selectors'
import {  setNfts } from '@/redux/reducers/nfts/reducer'
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
    const nfts = await getNftsByStatus([ResourceNftStatuses.LISTED, ResourceNftStatuses.SOLD])
    dispatch(setNfts(nfts));
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

  }, [[artists, nfts, collections]])

  const refetch = () => {
    fetchCollectionsData()
    fetchNfts()
  }

  return { artists, nfts, communautaryNfts, collections, nftsByArtist, galleries, refetch }
}

export default useFetchData