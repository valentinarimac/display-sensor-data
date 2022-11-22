import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function LineChart(props) {
  const lineChartData = {
    labels: props.passSensorData.map((item) => {
      const formatDateTime =
        item.date_time.substr(0, 10) + " " + item.date_time.slice(11, 19);
      return formatDateTime;
    }),
    datasets: [
      {
        label: props.labelValue,
        data: props.passSensorData.map((item) => item[props.passDataType]),
        backgroundColor: "#d77a61",
        borderColor: "#d77a61",
        pointBackgroundColor: "#873a24",
      },
    ],
  };

  return (
    <div
      className="chart"
      style={{ width: "70%", height: "70%", margin: "30px auto 30px auto" }}
    >
      <Line data={lineChartData}> Hello</Line>
    </div>
  );
}

export default LineChart;
