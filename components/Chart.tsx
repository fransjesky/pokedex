import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface ChartProps {
  data: number[];
}

export default function Chart(props: ChartProps) {
  const labels = ['HP', 'Atk', 'Def', 'Sp Atk', 'Sp Def', 'Spd'];

  const data = {
    labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Base Stats',
      },
    },
    animation: {
      delay: 1000,
      duration: 5000,
    },
  };

  return <Bar data={data} options={options} />;
}
