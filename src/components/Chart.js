import { Line } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const dateFormate = (e) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return e.toLocaleDateString("en-US", options).split(",")[1];
};
export default function Chart({ tasksStr, duration, startDate }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "My Chart",
      },
    },
  };
  let labels = [];
  let shouldHoursSpend = [];
  let spendHoursInRealLife = [];

  const tasks = JSON.parse(tasksStr);
  for (let i = 0; i < duration; i++) {
    const date = new Date(new Date(startDate).setDate(startDate.getDate() + i));
    labels.push(dateFormate(date));
    const allTasksInADay = tasks.filter(
      ({ startDate }) => startDate === dateFormate(date)
    );
    const shouldSpendHoursSum = allTasksInADay.reduce(
      (sum, current) => sum + current.hoursShouldSpend,
      0
    );

    const spendHoursInRealLifeSum = allTasksInADay.reduce(
      (sum, current) => sum + current.hourSpend,
      0
    );
    shouldHoursSpend.push(shouldSpendHoursSum);
    spendHoursInRealLife.push(spendHoursInRealLifeSum);
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Should hours spend",
        data: shouldHoursSpend,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Hours de facto",
        data: spendHoursInRealLife,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
