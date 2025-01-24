import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
        primary: { value: "#002F49F2" },
        secondary: { value: "#4B8BBE" },
        success: { value: "#08C074" },
        warning: { value: "#FF7D00" },
        danger: { value: "#F65252" },
        grey: { value: "#59676E" },
        text: { value: '#F8FBFD'},
        text1: { value: '#041822' },
        background: { value: "#DDE4F2" },
        border: { value: '#E2E9F6' }
        },
      },
      fonts: {
        logo: { value: 'Montserrat'},
        body: { value: 'Open Sans'},
        static: { value: 'Inter'}
      }
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;