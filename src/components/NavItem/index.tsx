import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

import { Flex, Icon, Link, FlexProps } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  link: string;
}
export function NavItem({ icon, children, link, ...rest }: NavItemProps) {
  const navigate = useNavigate();

  return (
    <Link
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => {
        navigate(link);
      }}
    >
      <Flex
        align="center"
        p="4"
        pl="2"
        role="group"
        cursor="pointer"
        _hover={{
          borderLeftWidth: '2px',
          borderColor: 'origem.500',
          color: 'origem.500',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="14"
            _groupHover={{
              color: 'origem.500',
            }}
            _activeLink={{
              color: 'origem.500',
            }}
            color={window.location.pathname === link ? 'origem.500' : 'black.500'}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}
