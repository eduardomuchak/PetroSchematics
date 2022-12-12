import { Link } from 'react-router-dom';

import { Box, Flex, IconButton } from '@chakra-ui/react';

import { sidebarIcons } from './items';

function NavIconBar() {
  return (
    <Box as="nav" backgroundColor={'#EDF2F7'} w={'88px'} minH="100vh" position={'fixed'}>
      <Flex mt={'152px'} p={4} minH={'79vh'} overflowY={'auto'} direction={'column'} gap={2} align={'center'}>
        {sidebarIcons.map((item, index) => (
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
    </Box>
  );
}

export default NavIconBar;
