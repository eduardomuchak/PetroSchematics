import { Link } from 'react-router-dom';

import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
  Image,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import logoImage from 'assets/logo.png';

import { NavItem } from 'components/NavItem';
import { NavItemMain } from 'components/NavItemMain';

import { LinkItems } from './items';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export function SidebarContent({ onClose, ...rest }: SidebarProps) {
  function verifyPermissionAdmin(linkName: string) {
    if (linkName === 'Alterar Permissões') {
      return true;
    }

    return false;
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      overflowY={'scroll'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to="/">
          <Image src={logoImage} alt="Logo Origem Energias" />
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Accordion allowMultiple>
        {LinkItems.map((link, index) => (
          <Box key={index}>
            {!verifyPermissionAdmin(link.name) && (
              <AccordionItem border={'none'}>
                <AccordionButton border={'none'}>
                  <Flex w={'100%'} align={'center'} justifyContent={'space-between'}>
                    <NavItemMain
                      key={link.link}
                      icon={link.icon}
                      link={link.link || '/'}
                      color={link.children.some((e) => e.link == window.location.pathname) ? 'origem.500' : 'black.500'}
                    >
                      <Text
                        color={
                          link.children.some((e) => e.link == window.location.pathname) ? 'origem.500' : 'black.500'
                        }
                      >
                        {link.name}
                      </Text>
                    </NavItemMain>
                    <AccordionIcon
                      color={link.children.some((e) => e.link == window.location.pathname) ? 'origem.500' : 'black.500'}
                    />
                  </Flex>
                </AccordionButton>
                <AccordionPanel>
                  {link.children.map((link) => (
                    <NavItem key={link.name} icon={link.icon} link={link.link || '/'}>
                      <Text
                        sx={{ fontSize: 12 }}
                        _groupHover={{
                          color: 'origem.500',
                        }}
                        _hover={{
                          color: 'origem.500',
                        }}
                        color={window.location.pathname === link.link ? 'origem.500' : 'black.500'}
                      >
                        {link.name}
                      </Text>
                    </NavItem>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            )}
          </Box>
        ))}
      </Accordion>
    </Box>
  );
}
