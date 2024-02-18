import { donutConfig } from '@/app/nfts/[id]/config';
import React from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const WalletGlobalView = () => {
  return (
    <section className="WalletGlobalView">
      <ReactApexChart
        className="WalletGlobalView__chart"
        options={donutConfig.options as ApexCharts.ApexOptions | undefined}
        series={donutConfig.series}
        type="donut"
        width={"100%"}
        height={400}
      />
    </section>
  );
};

export default WalletGlobalView;
