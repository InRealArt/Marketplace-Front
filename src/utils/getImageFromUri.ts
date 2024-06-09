export const getImageFromUri = (uri: string) => {
  return `${process.env.NEXT_PUBLIC_PINATA_URL}/ipfs/${uri}`
}