import React from 'react';
import { Nft } from '@/mocks/types';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import NftImage from '../../../public/images/NftBig.png';

interface FilterPopupProps {
  showBuyModal: boolean;
  setShowBuyModal: React.Dispatch<React.SetStateAction<boolean>>;

  filters: string[];
}

const FilterPopup = () => <div className="FilterPopup"></div>;

export default FilterPopup;
