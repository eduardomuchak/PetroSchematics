import { Flex } from '@chakra-ui/react';
import { Ring } from '@uiball/loaders';

export const RingLoading = () => (
  <Flex display={'flex'} align={'center'} justify={'center'} h={'90vh'}>
    <Ring speed={2} lineWeight={5} color="blue" size={64} />
  </Flex>
);
