import React, { useEffect } from 'react';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { ArtistId, ArtistType, NftId, NftType } from '@/types';
import { getImageFromUri } from '@/utils/getImageFromUri';
import Link from 'next/link';
import { getOpenSeaURL } from '@/utils/getOpenSeaURL';
import { Address } from 'viem';
import Image from 'next/image';
import { useEthPrice } from '@/customHooks/getETHPrice';
import { useAccount } from 'wagmi';
import { createOrder } from '@/lib/orders';
import { getUserInfos } from '@/redux/reducers/user/selectors';
import { useAppSelector } from '@/redux/hooks';
import { updateNft } from '@/lib/nfts';
import { ResourceNftStatuses } from '@prisma/client';
import {  updateNftById } from '@/redux/reducers/nfts/reducer';
import { useDispatch } from 'react-redux';
import { TransactionData, createTransactionData } from '@/lib/transaction';
import { marketplaceAddress } from '@/utils/constants';


export interface BuyModalProps extends Partial<NftType>, Partial<ArtistType> {
  showBuyModal: boolean;
  hide: () => void;
  buy: (() => void) | { payload: boolean; type: "modals/setLoginModalDisplay"; } | undefined;
  isBuying: boolean;
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
  isBuying,
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
            disabled={isBuying}
          />
          <Button
            action={buy as () => void}
            text={isBuying ? 'Buying...' : 'Buy now'}
            additionalClassName="gold"
            disabled={isBuying}
          />
        </div>
      </div>
    </div>
  )
};

const BuyModalSuccessfulContent = ({ hide, imageUri, certificateUri, tokenId, contractAddress, id }: BuyModalProps) => (
  <div className="BuyModal BuyModal--successful">
    <p className="BuyModal__description">
      Congratulations, the artwork is now yours. We will contact you as soon as possible to arrange the delivery date of the artwork. You can also view and trade it from your wallet in the purchased NFTs.
      Your artwork will now appear in the &quot;Communautary&quot; tab !
    </p>
    <div className="BuyModal__flex">
      {(imageUri && certificateUri) && <>
        <Image width={100} height={100} className="BuyModal__miniature" alt='nft-image' src={getImageFromUri(imageUri)} />
        <a href={getImageFromUri(certificateUri)} target='_blank' rel='noreferrer' className="BuyModal__download">Télécharger votre certificat d&apos;authenticité ici</a>
      </>
      }
    </div>
    <div className="BuyModal__buttons">
      {/*<Button
        action={hide}
        text={'Terminer'}
        additionalClassName="gold"
      />*/}
      {tokenId &&
        <div>
          <a target='_blank' rel='noreferrer' href={getOpenSeaURL(tokenId, contractAddress)} >
            <Button
              action={hide}
              text={'Voir mon NFT sur Opensea'}
              additionalClassName="purple"
            />
          </a>
        </div>
      }
    </div>
  </div>
);

const BuyModal = (props: BuyModalProps) => {
  const user = useAppSelector((state) => getUserInfos(state))
  const { address } = useAccount()
  const dispatch = useDispatch()

  useEffect(() => {

    if (props.isSuccess && user.infos?.id && props.id) {
      const createRwaOrderAndUpdateNft = async () => {
        try {
          console.log("PROPS WHEN SUCCESS", props);
          
          /*
          const txReceipt = await publicClient.getTransactionReceipt({ hash: props.hash })
          
          const hexDataEventBought = txReceipt.logs[1].data
          const itemId = parseInt(hexDataEventBought.slice(2, 66), 16)
          console.log('itemId : ', itemId)
          const tokenId = parseInt(hexDataEventBought.slice(66, 130), 16)
          console.log('tokenId : ', tokenId)
          const price = parseInt(hexDataEventBought.slice(130, 194), 16) 
          console.log('tokenId : ', price)
          const priceInEther = formatUnits(BigInt(price), 18)
          */
          //STEP 1 : Create record in Transaction table
          const transactionData: TransactionData = {
            tokenId: props.tokenId as number,
            functionName: 'purchaseItem',
            from: address as Address,
            to: marketplaceAddress,
            transferFrom: address as Address,
            transferTo: marketplaceAddress,
            price: props.price,
            transactionHash: props.hash
          }
          await createTransactionData(transactionData)

          //STEP 2 : Create record in Order table
          await createOrder({
            userId: user.infos?.id as string,
            nftId: props.id as number
          })

          //STEP 3 : Update ResourceNft record
          console.log(`UPDATE Nft id ${props.id} after purchase`)
          await updateNft({
            transactionHash: props.hash,
            owner: address,
            status: ResourceNftStatuses.SOLD,
            purchasedOnce: true,
            previousOwner: ''
          }, props.id as number)
          dispatch(updateNftById({ nftId: props.id as NftId, status: ResourceNftStatuses.SOLD, purchaseOnce: false }))
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
    disabledClosing={props.isBuying}
  >
    {props.isSuccess || props.showNftModal ? (
      <BuyModalSuccessfulContent {...props} />
    ) : (
      <BuyModalContent {...props} />
    )}
  </Modal>)
}

export default BuyModal;
