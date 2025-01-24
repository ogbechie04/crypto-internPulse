import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartData
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Text } from "@chakra-ui/react";

// -------- register required Chart.js components --------
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface SelectedItem {
  id: string;
  name: string;
  type: "crypto" | "stock";
}

interface CryptoPricePoint {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

interface StockPricePoint {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

const Chart: React.FC<{ selectedItem: SelectedItem }> = ({ selectedItem }) => {
  // -------- hold chart data --------
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  // -------- track loading state --------
  const [loading, setLoading] = useState<boolean>(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  // -------- fetch data when the selectedItem changes --------
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);

        if (!selectedItem || !selectedItem.id) {
          throw new Error("Invalid selected item");
        }

        if (selectedItem.type === "crypto") {
          // -------- fetch price trend data for a cryptocurrency --------
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${selectedItem.id}/market_chart?vs_currency=usd&days=7`
          );
          const data: CryptoPricePoint = await response.json();

          if (!data || !data.prices) {
            throw new Error("Invalid crypto data structure");
          }

          const labels = data.prices.map((price: [number, number]) =>
            new Date(price[0]).toLocaleDateString()
          );
          const prices = data.prices.map((price: [number, number]) => price[1]);

          setChartData({
            labels,
            datasets: [
              {
                label: `${selectedItem.name} Price Trend`,
                data: prices,
                borderColor: "#3b82f6",
                tension: 0.5,
                fill: false,
              },
            ],
          });
        } else {
          // -------- fetch price trend data for a stock --------
          const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedItem.id}&apikey=${apiKey}`
          );
          const data: { "Time Series (Daily)": StockPricePoint } = await response.json();

          const timeSeries = data["Time Series (Daily)"];
          if (!timeSeries) {
            throw new Error("Invalid stock data structure");
          }

          const prices = Object.entries(timeSeries)
            .slice(0, 7)
            .map(([date, details]) => ({
              date,
              price: parseFloat(details["4. close"]),
            }));

          const labels = prices.map((entry) => entry.date);
          const priceValues = prices.map((entry) => entry.price);

          setChartData({
            labels,
            datasets: [
              {
                label: `${selectedItem.name} Price Trend`,
                data: priceValues,
                borderColor: "green",
                tension: 0.2,
                fill: false,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Chart Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [selectedItem]);

  // Display a loading message while fetching data
  if (loading) return <Text>Loading chart...</Text>;

  // Show a fallback message if no data is available
  if (!chartData) return <Text>No data available for the selected item.</Text>;

  // Render the line chart
  return <Line data={chartData} />;
};

export default Chart;