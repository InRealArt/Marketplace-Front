export type ArtistId = string;
export type NftId = string;

export interface Artist {
  id: ArtistId;
  name: string;
  nfts: number;
  img: string;
}

export interface Nft {
  id: NftId;
  name: string;
  tag: string;
  price: number;
  likes: number;
  img: string;
}
