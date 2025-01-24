import { Box, Input } from "@chakra-ui/react";
import React, { useState, ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <Box w={"100%"} p={4} display={"flex"} justifyContent={"center"}>
      <Input
        type="text"
        placeholder="Search for crypto or stocks..."
        value={searchTerm}
        onChange={handleChange}
        w={{base: '90%', md: "50%"}}
        backgroundColor={"white"}
        borderColor={"blue.300"}
        css={{ "--focus-color": "green" }}
      />
    </Box>
  );
};

export default SearchBar;
