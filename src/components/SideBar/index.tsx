import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { Box, useColorModeValue, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { selectCurrentUser } from 'features/auth/authSlice';

import { MobileNav } from 'components/MobileNav';
import { SidebarContent } from 'components/SidebarContent';

import styles from './Sidebar.module.scss';

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(selectCurrentUser);
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} className={styles.sidebar}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'none', lg: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        onOpen={onOpen}
        name={user ? user?.nome : 'Usuário'}
        perfil={user ? user?.nome_role : 'Cargo'}
        profileImage={user ? user?.avatar : ''}
      />
      <Box ml={{ base: 0, md: 0, lg: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
