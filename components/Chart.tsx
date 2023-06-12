import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip);

interface ChartProps {
  data: number[];
}

export default function Chart(props: ChartProps) {
  const data = {
    labels: [
      'HP',
      'Attack',
      'Defense',
      'Special Attack',
      'Special Defense',
      'Speed',
    ],
    datasets: [
      {
        label: ' stat',
        data: props.data,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: 'transparent',
        hoverBorderColor: '#ffffff',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    layout: {
      padding: 20,
    },
    scales: {
      r: {
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
}
