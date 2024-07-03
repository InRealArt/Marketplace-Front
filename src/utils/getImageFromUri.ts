const generateRandomFiveDigitNumber = (): number => {
  return Math.floor(10000 + Math.random() * 90000);
}

export const getImageFromUri = (uri: string) => {
  return `${process.env.NEXT_PUBLIC_PINATA_URL}/ipfs/${uri}`
}