export type ArtistId = string;
export type NftId = string;

export interface Artist {
  id: ArtistId;
  name: string;
  img: string;
}

export interface Nft {
  id: NftId;
  title: string;
  tag: string;
  price: number;
  likes: number;
  img: string;
}
