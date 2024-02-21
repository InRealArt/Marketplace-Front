export const exampleConfig = {
  series: [
    {
      name: 'series1',
      data: [31, 40, 28],
    },
  ],
  options: {
    fontFamily: 'Poppins, sans-serif',
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        autoSelected: 'pan',
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    colors: ['#b39e73'],
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
      ],
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      theme: 'dark',
    },
  },
  optionBar: {
    fontFamily: 'Poppins, sans-serif',
  },
};

export const donutConfig = {
  series: [14, 37, 16],
  options: {
    chart: {
      width: 420,
      type: 'donut',
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: ['#ffffff', '#ffffff', '#ffffff'],
      },
      fontFamily: 'Poppins, sans-serif',
    },
    customLegend: ['nana'],
    stroke: {
      width: 0,
    },
    colors: ['#836727', '#D1A137', '#B4A073'],
    labels: ['ETH', 'EURO', 'NFT'],
    dataLabels: {
      formatter(val: any, opts: any) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return name;
      },
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '400',
        colors: ['000000'],
        fontSize: '15px',
      },
      dropShadow: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          dataLabels: {
            style: {
              fontSize: '8px',
            },
          },
        },
      },
    ],
  },
};
