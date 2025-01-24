import { Box } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";

function App() {
  return (
      <Box backgroundColor={'blue.50'} display={"flex"}>
        <Dashboard />
      </Box>
  );
}

export default App;
