import React from 'react';

interface FilterPopupProps {
  showBuyModal: boolean;
  setShowBuyModal: React.Dispatch<React.SetStateAction<boolean>>;

  filters: string[];
}

const FilterPopup = () => <div className="FilterPopup"></div>;

export default FilterPopup;
