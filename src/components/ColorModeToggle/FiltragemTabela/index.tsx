import { useState } from "react";
import { BsSearch } from "react-icons/bs";

import { Button, Flex, Input, Text } from "@chakra-ui/react";

interface Props {
  nomeLabel: string;
  nomeLabelData?: string;
  dadosTabela: any;
  setTabelaFiltrada: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
  propName: string;
  propNameData?: string;
  filtrarData?: boolean;
  registerForm: any;
}

function FiltragemTabela({
  nomeLabel,
  dadosTabela,
  setTabelaFiltrada,
  placeholder,
  propName,
  filtrarData,
  nomeLabelData,
  registerForm,
  propNameData,
}: Props) {
  const [search, setSearch] = useState<string>("");

  const filtrarTabela = () => {
    let filtered;
    if (search && search.length > 0) {
      filtered = dadosTabela?.filter(
        (dado: any) =>
          dado[propName].toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    }
    // if (search && search.length > 1 && filtrarData) {
    //   filtered = dadosTabela?.filter(
    //     (dado: any) =>
    //       dado[propName].toLowerCase().indexOf(search.toLowerCase()) > -1
    //   );
    // }
    else {
      filtered = dadosTabela;
    }

    if (filtered) {
      setTabelaFiltrada([...filtered]);
    }
  };

  return (
    <Flex align={"end"} wrap={"wrap"} gap={4}>
      <Flex direction={"column"}>
        <Text fontWeight={"700"} fontSize={"12px"} color={"#949494"}>
          {nomeLabel.toUpperCase()}
        </Text>
        <Input
          fontSize={"14px"}
          h={"56px"}
          fontWeight={"400"}
          width={"328px"}
          color={"black"}
          isRequired
          placeholder={placeholder}
          _placeholder={{ color: "#949494" }}
          id="name"
          type="text"
          name="name"
          onChange={(event) => setSearch(event.target.value)}
        />
      </Flex>

      <Flex>
        <Button
          h={"56px"}
          w={"117px"}
          borderRadius={"8px"}
          fontFamily={"Mulish"}
          background={"white"}
          border={"2px solid"}
          color={"origem.500"}
          fontSize={"18px"}
          fontWeight={"700"}
          onClick={() => filtrarTabela()}
          _hover={{
            border: "2px solid",
            borderColor: "origem.500",
            background: "origem.500",
            transition: "all 0.4s",
            color: "white",
          }}
          rightIcon={<BsSearch />}
        >
          Filtrar
        </Button>
      </Flex>
    </Flex>
  );
}

export default FiltragemTabela;
