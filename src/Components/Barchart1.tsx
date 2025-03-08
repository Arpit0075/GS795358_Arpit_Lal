import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart as ChartRe } from "react-chartjs-2";
import { SalesRevenue } from "../pages/Charts";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
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
    y2: {
      position: "right",
      title: {
        display: true,
        text: "GM_Percentage",
      },
      beginAtZero: true,
    },
  },
};

export default function Barchart1({
  dataObject,
}: {
  dataObject: SalesRevenue[];
}) {
  const labels = dataObject?.map((el: SalesRevenue) => el.time);

  //console.log(dataObject);

  const data = {
    labels,
    datasets: [
      {
        type: "bar" as const, // Bar chart for GM Dollars Sales
        label: "GM_DollarsSales",
        data: dataObject?.map((el: SalesRevenue) => el.GM_DollarsSales),
        backgroundColor: "rgba(62, 46, 188, 0.5)",
      },
      {
        type: "line" as const, // Line chart for Profit
        label: "GM_Percentage",
        data: dataObject?.map((el: SalesRevenue) => el.GM_percentage),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y2", // Link this dataset to the right y-axis (Profit Percentage)
      },
    ],
  };

  return (
    <>
      <ChartRe type="bar" options={options} data={data} />
    </>
  );
}
