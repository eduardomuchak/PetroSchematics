import { Button, Text } from '@chakra-ui/react';
import { Well } from 'features/wells/interfaces';

interface Props {
  well: Well;
}

function WellNameCard({ well }: Props) {
  return (
    <Button variant={'origemBlueSolid'} w={'328px'}>
      <Text>Well Name</Text>
    </Button>
  );
}

export default WellNameCard;
