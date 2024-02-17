import { donutConfig } from '@/app/nfts/[id]/config';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const WalletGlobalView = () => {
  return (
    <section className="WalletGlobalView">
      <ReactApexChart
        className="WalletGlobalView__chart"
        options={donutConfig.options as ApexCharts.ApexOptions | undefined}
        series={donutConfig.series}
        type="donut"
      />
    </section>
  );
};

export default WalletGlobalView;
