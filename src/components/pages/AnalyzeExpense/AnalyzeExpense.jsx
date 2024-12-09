// library imports
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; // You can use other charts like Line, Pie, etc.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MoonLoader } from "react-spinners";

// Registering required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// css module
import styles from "./AnalyzeExpense.module.css";

// context api
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext";

// expense db ops
import { getAllExpenses } from "../../../ExpenseDbOps";

function AnalyzeExpense() {
  // context api
  const { username } = useAuth();
  const { theme } = useTheme();

  // state
  const [chartData, setChartData] = useState(null);

  // effects
  useEffect(
    function () {
      async function initChart() {
        const expenses = await getAllExpenses(username);

        // Prepare data for the chart
        const categoryAmountMap = expenses.reduce((acc, expense) => {
          if (!acc[expense.category]) {
            acc[expense.category] = 0;
          }
          acc[expense.category] += Number(expense.amount);
          return acc;
        }, {});

        const categories = Object.keys(categoryAmountMap);
        const amounts = Object.values(categoryAmountMap);

        setChartData({
          labels: categories, // Categories for the x-axis
          datasets: [
            {
              label: "Expenses",
              data: amounts, // Expense amounts for the y-axis
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      }

      initChart();
    },
    [username]
  );

  return (
    <div
      className={`${styles.container} ${theme == "dark" ? "" : "lightMode"}`}
    >
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: false,
                text: "Expenses by Category",
              },
            },
          }}
        />
      ) : (
        <div className={styles.loaderContainer}>
          <MoonLoader color={theme === "dark" ? "#f7f9ff" : "#393e46"} />
        </div>
      )}
    </div>
  );
}

export default AnalyzeExpense;
