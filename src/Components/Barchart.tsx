import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SalesRevenue } from "../pages/Charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Gross Margin per week",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Week",
      },
    },
    y: {
      title: {
        display: true,
        text: "GM Dollars Sales",
      },
      beginAtZero: true,
    },
  },
};

export default function Barchart({
  dataObject,
  selectedStore,
}: {
  dataObject: SalesRevenue[];
  selectedStore: string;
}) {
  //console.log(dataObject);

  const labels = dataObject?.map((el: SalesRevenue) => el.time);
  //   console.log(selectedStore);

  const data = {
    labels,
    datasets: [
      {
        label: selectedStore,
        data: dataObject?.map((el: SalesRevenue) => el.GM_DollarsSales),
        backgroundColor: "rgba(62, 46, 188, 0.5)",
      },
      {
        label: "GM_Percentage",
        data: dataObject?.map((el: SalesRevenue) => el.GM_percentage),
        backgroundColor: "rgba(133, 167, 66, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
