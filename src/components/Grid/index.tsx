import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { Flex, Grid, GridItem, IconButton, Image } from '@chakra-ui/react';
import logoImage from 'assets/logo_origem_branco.svg';

import { sidebarIcons } from './items';

function GridLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      templateAreas={`"header header"
                      "nav main"`}
      gridTemplateRows={'152px 1fr'}
      gridTemplateColumns={'88px 1fr'}
      minH={'100vh'}
    >
      <GridItem bg="origem.500" area={'header'} px={20} py={5} as="header">
        <Flex direction={'column'} justify={'space-between'} flex={1} height={'100%'}>
          <Link to="/">
            <Image src={logoImage} alt="Logo Origem Energias" />
          </Link>
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
          />
        </Flex>
      </GridItem>
      <GridItem bg="#EDF2F7" area={'nav'} as="nav" p={5}>
        <Flex direction={'column'} gap={2} align={'center'}>
          {sidebarIcons.map((item: any, index: number) => (
            <Link to={item.link} key={index}>
              <IconButton
                key={item.name}
                aria-label={item.name}
                icon={<item.icon size={24} />}
                variant={'origemSidebarIcon'}
              />
            </Link>
          ))}
        </Flex>
      </GridItem>
      <GridItem area={'main'} as="main" p={5} flex={1}>
        {children}
      </GridItem>
    </Grid>
  );
}

export default GridLayout;
