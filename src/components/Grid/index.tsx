import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { Button, Flex, Grid, GridItem, IconButton, Image, Text } from '@chakra-ui/react';
import logoImage from 'assets/logo_origem_branco.svg';

import LogoutButton from 'components/LogoutButton';

import { sidebarIcons } from './items';

function GridLayout({ children, title, goToPage }: { children: React.ReactNode; title?: string; goToPage?: string }) {
  const [isHovering, setIsHovering] = useState(false);

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
          <Flex direction={'row'} align={'center'} w={'100%'}>
            {goToPage ? (
              <Link to={goToPage}>
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
                  height={'40px'}
                  width={'40px'}
                />
              </Link>
            ) : (
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
            )}
            <Flex align={'center'} justify={'center'} ml={3}>
              <Text fontWeight={700} fontSize={18} letterSpacing={0.3} color={'#FEFEFE'}>
                {title || ''}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem
        bg="#EDF2F7"
        area={'nav'}
        as="nav"
        p={5}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        width={isHovering ? '280px' : '88px'}
        transition={'all 0.4s'}
        zIndex={999}
      >
        <Flex direction={'column'} align={'center'} justify={'space-between'} h={'100%'}>
          <Flex direction={'column'} gap={2} align={'flex-start'}>
            {sidebarIcons.map((item: any, index: number) => (
              <Link to={item.link} key={index}>
                <Button
                  key={item.name}
                  aria-label={item.name}
                  variant={'origemSidebarIcon'}
                  width={isHovering ? '240px' : '48px'}
                  transition={'all 0.4s'}
                >
                  <Flex align={'center'} w={isHovering ? '100%' : 'auto'} flex={1}>
                    <Text fontSize={24}>
                      <item.icon />
                    </Text>
                    {isHovering && (
                      <Text
                        fontSize={14}
                        ml={2}
                        // transform={isHovering ? 'translateX(0px)' : 'translateX(-200px)'}
                        wordBreak={'break-word'}
                      >
                        {item.name}
                      </Text>
                    )}
                  </Flex>
                </Button>
              </Link>
            ))}
          </Flex>
          <LogoutButton isHovering={isHovering} />
        </Flex>
      </GridItem>
      <GridItem area={'main'} as="main" p={5} display={'flex'} justifyContent={'center'}>
        {children}
      </GridItem>
    </Grid>
  );
}

export default GridLayout;
