import React from 'react';

interface Props {
  nbOfNfts: number;
}
const WalletNftMain = ({ nbOfNfts }: Props) => {
  console.log(nbOfNfts);
  return (
    <section className="WalletNftMain">
      <div className="WalletNftMain__"></div>
    </section>
  );
};

export default WalletNftMain;
