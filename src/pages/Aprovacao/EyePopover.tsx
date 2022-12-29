import { useEffect, useState } from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { keyName } from './keyNamePairs';

function EyePopover({ infos }: any) {
  const [renderInfos, setRenderInfos] = useState<any[]>([]);
  useEffect(() => {
    const renderArray = [];
    for (const property in infos.form_data) {
      if (property == 'poco') {
        const newItem = {
          name: 'Poco',
          value: infos.form_data[property].nome_poco,
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.splice(0, 0, newItem);
        }
      } else if (property == 'tanque') {
        const newItem = {
          name: 'Tanque',
          value: infos.form_data[property].nom_tanque,
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.splice(0, 0, newItem);
        }
      } else {
        const key = keyName.filter((val: any) => val.key === property)[0];
        const newItem = {
          name: key ? key.title : property,
          value: infos.form_data[property],
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.push(newItem);
        }
      }
    }
    setRenderInfos(renderArray);
  }, [infos]);

  return (
    <Flex direction={'column'} pl={1}>
      {renderInfos.map((item: any) => (
        <Flex>
          <Text fontWeight={700} fontSize={13} letterSpacing={0.3} color={'#1C1B1B'} mb={'4px'}>
            {item.name}:
          </Text>
          <Text ml={'5px'} fontSize={13} letterSpacing={0.3} color={'#1C1B1B'}>
            {item.value}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default EyePopover;
