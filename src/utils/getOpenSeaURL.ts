import { Address } from "viem";

export const getOpenSeaURL = (tokenId: string | number, contract: Address) =>
`https://testnets.opensea.io/assets/sepolia/${contract}/${tokenId}`;
