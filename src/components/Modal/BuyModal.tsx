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

interface BuyModalProps extends Partial<NftType>, Partial<ArtistType> {
  showBuyModal: boolean;
  hide: () => void;
  buy: (() => void) | { payload: boolean; type: "modals/setLoginModalDisplay"; } | undefined;
  isMinting: boolean;
  isSuccess: boolean;
  contractAddress: Address
  price: number
  artistId: ArtistId | undefined
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
  const { address } = useAccount();
  const { data } = useBalance({ address });
  const { ethPrice: ethEuroPrice } = useEthPrice('eur');
  const balance = data && formatUnits(data!.value, data!.decimals)
  const currentEthValue = ethEuroPrice
    ? Number(balance) * ethEuroPrice
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
      Félicitations, l’oeuvre est désormais la votre. Vous pouvez la télécharger
      directement sur cette page. Vous pouvez également la consulté et traider
      depuis votre profil dans les NFT récente.
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

  useEffect(() => {
    if (props.isSuccess && user.infos?.id && props.id) {
      const createRwaOrder = async () => {
        try {
          await createOrder({
            userId: user.infos?.id as string,
            nftId: props.id as number
          })
        }
        catch(err) {
          console.error("Create Order", err);
        }
      };
      createRwaOrder()
    }
  }, [props.isSuccess])

  return (<Modal
    title={props.isSuccess ? 'Acquisition confirmé 🥳' : props.name || ''}
    show={props.showBuyModal}
    hide={props.hide}
  >
    {props.isSuccess ? (
      <BuyModalSuccessfulContent {...props} />
    ) : (
      <BuyModalContent {...props} />
    )}
  </Modal>)
}

export default BuyModal;
