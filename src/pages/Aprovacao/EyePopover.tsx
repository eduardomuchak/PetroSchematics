import { useEffect, useState } from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { keyName } from './keyNamePairs';

function EyePopover({ infos }: any) {
  const [renderInfos, setRenderInfos] = useState<any[]>([]);
  useEffect(() => {
    // const keys = Object.keys(infos.form_data);
    // console.log('keys', keys);
    // const values = Object.values(infos.form_data);
    // console.log('values', values);
    // setRenderInfos(values);
    const renderArray = [];
    for (const property in infos.form_data) {
      const newItem = {
        name: keyName.filter((val: any) => val.key === property)[0].title,
        value: infos.form_data[property],
      };
      if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
        renderArray.push(newItem);
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
