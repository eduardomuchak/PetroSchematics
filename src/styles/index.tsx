import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/buttonStyles";
import { InputStyles as Input } from "./components/inputStyles";
import { modalTheme as Modal } from "./components/modalOverlay";
import foundations from "./foundations";

const direction = "ltr";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
  cssVarPrefix: "chakra",
};

export const theme = {
  direction,
  ...foundations,
  config,
  components: {
    Button,
    Input,
    Modal,
  },
};

export default extendTheme(theme);
