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

interface SellModalProps extends Partial<NftType>, Partial<ArtistType> {
  showSellModal: boolean;
  hide: () => void;
  buy: (() => void) | { payload: boolean; type: "modals/setLoginModalDisplay"; } | undefined;
  isMinting: boolean;
  isSuccess: boolean;
  showNftModal: boolean;
  contractAddress: Address
  price: number
  artistId: ArtistId | undefined
}

const SellModalContent = ({
  hide,
  buy,
  isMinting,
  price,
  imageUri,
  pseudo,
  artistId
}: SellModalProps) => {
  const { ethPrice: ethEuroPrice } = useEthPrice('eur');
  const currentEthValue = ethEuroPrice
    ? Number(price) * ethEuroPrice
    : 0;

  return (
    <div className="SellModal">
      {imageUri && <div
        className="SellModal__img"
        style={{
          backgroundImage: ` url('${getImageFromUri(imageUri)}')`,
        }}
      />}
      <div className="SellModal__infos">
        <h3 className="SellModal__price">{price} ETH</h3>
        <p className="SellModal__description">
          Cette œuvre réalisé par <Link href={`/artists/${artistId}`} onClick={hide}>{pseudo}</Link> coûte actuellement{' '}
          <span>{price} ETH</span> ce qui représente donc l&apos;équivalent d&apos;environ {currentEthValue.toFixed(0)} €
        </p>
        <div className="SellModal__buttons">
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

const SellModalSuccessfulContent = ({ hide, imageUri, certificateUri, tokenId, contractAddress }: SellModalProps) => (
  <div className="SellModal SellModal--successful">
    <p className="SellModal__description">
      Félicitations, l’oeuvre est désormais la votre. Vous pouvez la télécharger
      directement sur cette page. Vous pouvez également la consulté et traider
      depuis votre profil dans les NFT récente.
    </p>
    <div className="SellModal__flex">
      {(imageUri && certificateUri) && <>
        <Image width={100} height={100} className="SellModal__miniature" alt='nft-image' src={getImageFromUri(imageUri)} />
        <a href={getImageFromUri(certificateUri)} target='_blank' rel='noreferrer' className="SellModal__download">Télécharger votre certificat d&apos;authenticité ici</a>
      </>
      }
    </div>
    <div className="SellModal__buttons">
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

const SellModal = (props: SellModalProps) => {
  return (<Modal
    title={props.isSuccess || props.showNftModal ? 'NFT mis en vente 🥳' : props.name || ''}
    show={props.showSellModal}
    hide={props.hide}
  >
    {props.isSuccess || props.showNftModal ? (
      <SellModalSuccessfulContent {...props} />
    ) : (
      <SellModalContent {...props} />
    )}
  </Modal>)
}

export default SellModal;
