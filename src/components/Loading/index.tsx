import { Flex } from '@chakra-ui/react';
import { Jelly } from '@uiball/loaders';

export const Loading = () => (
  <Flex display={'flex'} align={'center'} justify={'center'} h={'90vh'}>
    <Jelly speed={0.9} color="blue" size={80} />
  </Flex>
);
