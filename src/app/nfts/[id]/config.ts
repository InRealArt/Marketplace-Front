export const exampleConfig = {
  series: [
    {
      data: [
        {
          x: 1,
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: 2,
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
        {
          x: 3,
          y: [6630.71, 6648.95, 6623.34, 6635.65],
        },
        {
          x: 4,
          y: [6635.65, 6651, 6629.67, 6638.24],
        },
        {
          x: 5,
          y: [6638.24, 6640, 6620, 6624.47],
        },
        {
          x: 6,
          y: [6624.53, 6636.03, 6621.68, 6624.31],
        },
      ],
    },
  ],
  options: {
    fontFamily: 'Poppins, sans-serif',
    chart: {
      type: 'candlestick',
      height: 350,
      innerWidth: 300,
      id: 'candles',
      toolbar: {
        autoSelected: 'pan',
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    legend: {
      labels: {
        colors: ['#ffffff', '#ffffff', '#ffffff'],
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ['fff'],
      },
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#ffffff',
        downward: '#ffffff',
      },
    },
  },
  optionBar: {
    fontFamily: 'Poppins, sans-serif',
    selection: {
      enabled: true,
      xaxis: {
        min: 1,
        max: 7,
        style: {
          fontSize: '12px',
          color: '#fff',
        },
      },
      fill: {
        color: '#fff',
        opacity: 1,
      },
      stroke: {
        color: '#0D47A1',
      },
    },
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
