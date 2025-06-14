export type ArtistId = string;
export type NftId = string;

export interface Artist {
  id: ArtistId;
  name: string;
  nfts?: number;
  bio?: string;
  img?: string;
  imgNFT?: string;
  filters?: string[];
}

export interface Nft {
  id: NftId;
  name: string;
  price: number;
  likes: number;
  artist?: Omit<Artist, 'nfts' | 'bio'>;
  description?: string;
  filters: string[];
  img: string;
}
