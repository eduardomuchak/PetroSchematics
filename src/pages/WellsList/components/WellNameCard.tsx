import { useNavigate } from 'react-router-dom';

import { Button, Text } from '@chakra-ui/react';
import { Well } from 'features/wells/interfaces';

interface Props {
  well: Well;
}

function WellNameCard({ well }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      variant={'origemBlueSolid'}
      w={'328px'}
      onClick={() => navigate(`/esquematico-well/config/${well._id}`, { state: { well } })}
    >
      <Text>{well.nome_poco}</Text>
    </Button>
  );
}

export default WellNameCard;
