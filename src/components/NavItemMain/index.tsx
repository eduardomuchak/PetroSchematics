import { ReactNode } from 'react';
import { IconType } from 'react-icons';

import { Flex, Icon, FlexProps } from '@chakra-ui/react';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  link: string;
  color: string;
}
export function NavItemMain({ icon, children, link, color, ...rest }: NavItemProps) {
  return (
    <Flex fled="1" align="center" p="4" py="4" px="1" borderRadius="lg" role="group" cursor="pointer" {...rest}>
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _activeLink={{
            color: 'white',
          }}
          color={color}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
}
