import React from "react";
import "../index.css";
import { Heading, VStack, Text, Box } from "@chakra-ui/react";

interface Item {
  id: string;
  name: string;
  type: "crypto" | "stock";
  price?: number;
  marketCap?: number;
  volume?: number;
  priceChange?: number;
  dailyChange?: number; // for stocks
}

interface PriceDisplayProps {
  item: Item;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ item }) => {
  return (
    <Box>
      <VStack
        border={1}
        p={5}
        // borderRadius={}
        boxShadow="md"
        backgroundColor={item.type === "crypto" ? "gray.50" : "gray.100"}
        textAlign={"left"}
        width={"100%"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        cursor={"pointer"}
      >
        {/* <img src={`https://cryptologos.cc/logos/${item.id.toLowerCase()}-logo.png`} alt={item.name} width="50" height="50" /> */}
        <Heading textAlign={"left"}>{item.name}</Heading>
        {item.type === "crypto" ? (
          <VStack
            textAlign={"left"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Text className="font-serif">
              <Text as={"span"} fontWeight={"medium"}>
                Price:
              </Text>{" "}
              ${item.price}
            </Text>
            <Text>
              <Text as={"span"} fontWeight={"medium"}>
                Market Cap:
              </Text>{" "}
              ${item.marketCap?.toLocaleString()}
            </Text>
            <Text>
              <Text as={"span"} fontWeight={"medium"}>
                Volume:
              </Text>{" "}
              ${item.volume?.toLocaleString()}
            </Text>
            <Text>
              <Text as={"span"} fontWeight={"medium"}>
                24h Change:
              </Text>{" "}
              {item.priceChange?.toFixed(2)}%
            </Text>
          </VStack>
        ) : (
          <VStack justifyContent={"flex-start"} alignItems={"flex-start"}>
            <Text>
              <Text as={"span"} fontWeight={"medium"}>
                Price:
              </Text>{" "}
              ${item.price?.toFixed(2)}
            </Text>
            <Text>
              <Text as={"span"} fontWeight={"medium"}>
                Daily Change:
              </Text>{" "}
              {item.dailyChange?.toFixed(2)}%
            </Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default PriceDisplay;
