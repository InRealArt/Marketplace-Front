export type ArtistId = string;
export type NftId = string;

export interface Artist {
  id: ArtistId;
  name: string;
  img: string;
}

export interface Nft {
  id: NftId;
  name: string;
  img: string;
}
