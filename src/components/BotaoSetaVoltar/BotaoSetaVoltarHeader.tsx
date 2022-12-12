import { IoIosArrowBack } from 'react-icons/io';

import { IconButton } from '@chakra-ui/react';

function BotaoSetaVoltarHeader() {
  return (
    <IconButton
      aria-label="Botão Voltar"
      icon={<IoIosArrowBack size={20} />}
      borderRadius={'10px'}
      background={'transparent'}
      color={'white'}
      _hover={{
        background: 'white',
        transition: 'all 0.4s',
        color: 'origem.500',
      }}
      onClick={() => {
        window.history.back();
      }}
      height={'40px'}
      width={'40px'}
      mt={'40px'}
      ml={'-10px'}
    />
  );
}

export default BotaoSetaVoltarHeader;
