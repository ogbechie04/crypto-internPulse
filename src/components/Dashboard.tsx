import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PriceDisplay from "./PriceDisplay";
import Chart from "./Chart";
import { Box, Heading } from "@chakra-ui/react";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  type: "crypto";
  price: number;
  marketCap: number;
  volume: number;
  priceChange: number;
}

interface Stock {
  id: string;
  name: string;
  type: "stock";
  price: number;
  volume: number;
  timestamp: string;
}

// interface StockQuote {
//   "1. symbol": string;
//   "2. price": string;
//   "3. volume": string;
//   "4. timestamp": string;
// }

interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

type SelectedItem = Crypto | Stock;

const Dashboard = () => {
  // -------- Combined list of crypto and stocks --------
  const [data, setData] = useState<(Crypto | Stock)[]>([]);
  // -------- Filtered data for search --------
  const [filteredData, setFilteredData] = useState<(Crypto | Stock)[]>([]);
  // -------- Item for chart --------
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  // const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // -------- Fetch cryptocurrencies --------
        const cryptoResponse = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
        );
        const cryptoData = await cryptoResponse.json();

        // // -------- Fetch stocks using Batch Stock Quotes API --------
        // const stockSymbols = ["AAPL", "GOOGL",];
        // const joinedSymbols = stockSymbols.join(",");
        // const stockResponse = await fetch(
        //   `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${joinedSymbols}&apikey=${apiKey}`
        // );
        // const stockData = await stockResponse.json();

        // // -------- error for if no stock data found --------
        // if (!stockData["Stock Quotes"]) {
        //   console.error("No stock data found", stockData);
        //   return;
        // }

        // // -------- Map stock data --------
        // const stocks: Stock[] = stockData["Stock Quotes"].map((quote: StockQuote) => ({
        //   id: quote["1. symbol"],
        //   name: quote["1. symbol"],
        //   type: "stock" as const,
        //   price: parseFloat(quote["2. price"]),
        //   volume: parseInt(quote["3. volume"], 10),
        //   timestamp: quote["4. timestamp"],
        // }));

        // -------- Map crypto data --------
        const crypto: Crypto[] = cryptoData.map((coin: CryptoCoin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          type: "crypto",
          price: coin.current_price,
          marketCap: coin.market_cap,
          volume: coin.total_volume,
          priceChange: coin.price_change_percentage_24h,
        }));

        // -------- Combine crypto and stock data --------
        // const combinedData = [...crypto, ...stocks];
        setData(crypto);
        setFilteredData(crypto);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (term: string) => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <Box width="100%" display="flex" flexDirection="column" marginY={5}>
      <Heading as="h1" fontSize={{ base: "2xl", lg: "4xl" }} textAlign="center">
        Crypto & Stock Dashboard
      </Heading>
      <SearchBar onSearch={handleSearch} />
      <Box display="grid" gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
        {filteredData.map((item) => (
          <Box key={item.id} onClick={() => setSelectedItem(item)} width="100%">
            <PriceDisplay item={item} />
          </Box>
        ))}
      </Box>
      <Box width="100%" display="flex" justifyContent="center" my={10}>
      {selectedItem && <Chart selectedItem={selectedItem} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
