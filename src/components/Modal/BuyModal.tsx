import React, { useEffect } from 'react';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { ArtistId, ArtistType, NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import Link from 'next/link';
import { getOpenSeaURL } from '@/utils/getOpenSeaURL';
import { Address, formatUnits } from 'viem';
import Image from 'next/image';
import { useEthPrice } from '@/customHooks/getETHPrice';
import { useAccount, useBalance } from 'wagmi';
import { createOrder } from '@/lib/orders';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { useAppSelector } from '@/redux/hooks';
import { updateNft } from '@/lib/nfts';

interface BuyModalProps extends Partial<NftType>, Partial<ArtistType> {
  showBuyModal: boolean;
  hide: () => void;
  buy: (() => void) | { payload: boolean; type: "modals/setLoginModalDisplay"; } | undefined;
  isMinting: boolean;
  isSuccess: boolean;
  showNftModal: boolean;
  contractAddress: Address
  price: number
  artistId: ArtistId | undefined
  hash: Address
}

const BuyModalContent = ({
  hide,
  buy,
  isMinting,
  price,
  imageUri,
  pseudo,
  artistId
}: BuyModalProps) => {
  const { ethPrice: ethEuroPrice } = useEthPrice('eur');
  const currentEthValue = ethEuroPrice
    ? Number(price) * ethEuroPrice
    : 0;

  return (
    <div className="BuyModal">
      {imageUri && <div
        className="BuyModal__img"
        style={{
          backgroundImage: ` url('${getImageFromUri(imageUri)}')`,
        }}
      />}
      <div className="BuyModal__infos">
        <h3 className="BuyModal__price">{price} ETH</h3>
        <p className="BuyModal__description">
          Cette œuvre réalisé par <Link href={`/artists/${artistId}`} onClick={hide}>{pseudo}</Link> coûte actuellement{' '}
          <span>{price} ETH</span> ce qui représente donc l&apos;équivalent d&apos;environ {currentEthValue.toFixed(0)} €
        </p>
        <div className="BuyModal__buttons">
          <Button
            action={hide}
            text="Cancel"
            additionalClassName="goldBorder"
          />
          <Button
            action={buy as () => void}
            text={isMinting ? 'Buying...' : 'Buy now'}
            additionalClassName="gold"
          />
        </div>
      </div>
    </div>
  )
};

const BuyModalSuccessfulContent = ({ hide, imageUri, certificateUri, tokenId, contractAddress }: BuyModalProps) => (
  <div className="BuyModal BuyModal--successful">
    <p className="BuyModal__description">
    Congratulations, the artwork is now yours. We will contact you as soon as possible to arrange the delivery date of the artwork. You can also view and trade it from your wallet in the purchased NFTs.
    </p>
    <div className="BuyModal__flex">
      {(imageUri && certificateUri) && <>
        <Image width={100} height={100} className="BuyModal__miniature" alt='nft-image' src={getImageFromUri(imageUri)} />
        <a href={getImageFromUri(certificateUri)} target='_blank' rel='noreferrer' className="BuyModal__download">Télécharger votre certificat d&apos;authenticité ici</a>
      </>
      }
    </div>
    <div className="BuyModal__buttons">
      <Button
        action={hide}
        text={'Terminer'}
        additionalClassName="gold"
      />
      {tokenId && <a target='_blank' rel='noreferrer' href={getOpenSeaURL(tokenId, contractAddress)} >
        <Button
          action={hide}
          text={'Voir mon NFT sur Opensea'}
          additionalClassName="purple"
        />
      </a>}
    </div>
  </div>
);

const BuyModal = (props: BuyModalProps) => {
  const user = useAppSelector((state) => getUserInfos(state))
  const {address} = useAccount()

  useEffect(() => {
    if (props.isSuccess && user.infos?.id && props.id) {
      const createRwaOrderAndUpdateNft = async () => {
        try {
          await createOrder({
            userId: user.infos?.id as string,
            nftId: props.id as number
          })
          await updateNft({
            transactionHash: props.hash,
            owner: address
          }, props.id as number)
        }
        catch (err) {
          console.error("Create Order", err);
        }
      };
      createRwaOrderAndUpdateNft()
    }
  }, [props.isSuccess])

  return (<Modal
    title={props.isSuccess || props.showNftModal ? 'Acquisition confirmé 🥳' : props.name || ''}
    show={props.showBuyModal}
    hide={props.hide}
  >
    {props.isSuccess || props.showNftModal ? (
      <BuyModalSuccessfulContent {...props} />
    ) : (
      <BuyModalContent {...props} />
    )}
  </Modal>)
}

export default BuyModal;
