import { Link } from 'react-router-dom';

import { Box, Flex, Image } from '@chakra-ui/react';
import logoImage from 'assets/logo_origem_branco.svg';

import NavIconBar from './NavIconBar';

function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavIconBar />
      <Box
        as="header"
        position={'absolute'}
        top={0}
        height={'152px'}
        backgroundColor={'origem.500'}
        w={'full'}
        px={'88px'}
        py={'22px'}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Link to="/">
            <Image src={logoImage} alt="Logo Origem Energias" />
          </Link>
        </Flex>
        <Box mt={'95px'} p={4} flex={1}>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default Header;
