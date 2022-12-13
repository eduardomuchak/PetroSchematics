import { useEffect, useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsCalendarEvent } from 'react-icons/bs';
import { useLocation } from 'react-router';

import { Flex, Text } from '@chakra-ui/react';

import { keyName } from 'pages/Aprovacao/keyNamePairs';

import Header from 'components/Header';
import TituloPagina from 'components/TituloPagina';

import ModalAprove from './Modais/Aprove';
import ModalNext from './Modais/Next';
import ModalPrevious from './Modais/Previous';
import ModalReprove from './Modais/Reprove';

export function Formulariopage() {
  const { state }: any = useLocation();
  const [renderList, setRenderList] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(state.index);

  useEffect(() => {
    const first = state.list[state.index];
    const renderArray = [];
    for (const property in first.form_data) {
      if (property == 'poco') {
        const newItem = {
          name: 'Poco',
          value: first.form_data[property].nome_poco,
          type: 'poco',
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.splice(0, 0, newItem);
        }
      } else if (property == 'tanque') {
        const newItem = {
          name: 'Tanque',
          value: first.form_data[property].nom_tanque,
          type: 'poco',
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.splice(0, 0, newItem);
        }
      } else {
        const newItem = {
          name: keyName.filter((val: any) => val.key === property)[0].title,
          value: first.form_data[property],
          type: keyName.filter((val: any) => val.key === property)[0].type,
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.push(newItem);
        }
      }
    }
    setRenderList(renderArray);
  }, []);

  const handlePrev = (value: boolean) => {
    const newIndex = value ? currentIndex - 1 : currentIndex + 1;
    const first = state.list[newIndex];
    const renderArray = [];
    for (const property in first.form_data) {
      if (property == 'poco') {
        const newItem = {
          name: 'Poco',
          value: first.form_data[property].nome_poco,
          type: 'poco',
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.splice(0, 0, newItem);
        }
      } else if (property == 'tanque') {
        const newItem = {
          name: 'Tanque',
          value: first.form_data[property].nom_tanque,
          type: 'poco',
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.splice(0, 0, newItem);
        }
      } else {
        const newItem = {
          name: keyName.filter((val: any) => val.key === property)[0].title,
          value: first.form_data[property],
          type: keyName.filter((val: any) => val.key === property)[0].type,
        };
        if (typeof newItem.value === 'string' || typeof newItem.value === 'number') {
          renderArray.push(newItem);
        }
      }
    }
    setCurrentIndex(newIndex);
    setRenderList(renderArray);
  };

  return (
    <Header>
      <TituloPagina botaoVoltar>Formulário para Aprovação</TituloPagina>
      <Flex justify={'center'} gap={10} direction={'row'} flex={1}>
        {currentIndex == 0 ? undefined : <ModalPrevious handle={handlePrev} />}
        <Flex direction={'column'}>
          <Flex align={'center'} gap={4} w={'700px'} flexWrap="wrap">
            {renderList.map((item: any) => (
              <Flex flexGrow={1} minW={item.type == 'multiline' ? '500px' : '200px'} direction={'column'}>
                <Text fontWeight={700} fontSize={12} letterSpacing={0.3} color={'#949494'}>
                  {item.name}
                </Text>
                {item.type == 'poco' ? (
                  <Text fontWeight={700} fontSize={20} letterSpacing={0.3} color={'#0048BB'}>
                    {item.value}
                  </Text>
                ) : (
                  <Flex
                    borderWidth={'1px'}
                    borderColor={'#949494'}
                    borderRadius={'8px'}
                    h={item.type == 'multiline' ? '200px' : '56px'}
                    align={item.type == 'multiline' ? undefined : 'center'}
                    p={'8px'}
                    justify={'space-between'}
                  >
                    <Text fontWeight={400} fontSize={12} letterSpacing={0.3} color={'#949494'}>
                      {item.value}
                    </Text>
                    {item.type == 'time' ? <AiOutlineClockCircle size={24} /> : undefined}
                    {item.type == 'date' ? <BsCalendarEvent size={22} /> : undefined}
                  </Flex>
                )}
              </Flex>
            ))}
          </Flex>
          <Flex justify={'center'} gap={2} mt={'24px'} direction={'row'} w={'100%'}>
            <ModalReprove />
            <ModalAprove />
          </Flex>
        </Flex>
        {currentIndex == state.list.length - 1 ? undefined : <ModalNext handle={handlePrev} />}
      </Flex>
    </Header>
  );
}
