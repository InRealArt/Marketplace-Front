'use client';
import React from 'react';
import { useParams } from 'next/navigation';

const Artist = () => {
  const { id } = useParams();
  return <main className="Artist">Je suis un artist {id}</main>;
};

export default Artist;
