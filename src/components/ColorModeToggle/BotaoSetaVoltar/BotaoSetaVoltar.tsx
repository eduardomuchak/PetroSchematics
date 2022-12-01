import { IoIosArrowBack } from "react-icons/io";

import { IconButton } from "@chakra-ui/react";

function BotaoSetaVoltar() {
  return (
    <IconButton
      aria-label="Botão Voltar"
      icon={<IoIosArrowBack size={20} />}
      borderRadius={"10px"}
      background={"white"}
      // color={"origem.500"}
      _hover={{
        background: "origem.500",
        transition: "all 0.4s",
        color: "white",
      }}
      onClick={() => {
        window.history.back();
      }}
    />
  );
}

export default BotaoSetaVoltar;
