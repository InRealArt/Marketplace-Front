'use client';
import React from 'react';
import { useParams } from 'next/navigation';

const Nft = () => {
  const { id } = useParams();
  return <main className="Nft">Je suis un Nft {id}</main>;
};

export default Nft;
