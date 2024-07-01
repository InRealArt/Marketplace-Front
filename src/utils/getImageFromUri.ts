const generateRandomFiveDigitNumber = (): number => {
  return Math.floor(10000 + Math.random() * 90000);
}

export const getImageFromUri = (uri: string) => {
  const cacheBuster = generateRandomFiveDigitNumber()
  return `${process.env.NEXT_PUBLIC_PINATA_URL}/ipfs/${uri}?cache_buster=${cacheBuster}`
}