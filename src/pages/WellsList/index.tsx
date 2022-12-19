import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { Well } from 'features/wells/interfaces';
import { useGetWellsListQuery } from 'features/wells/service/wellsApi';
import {
  setWellsList,
  wellsState,
  setSelectedWell,
  setInicialFilteredWellsList,
  filterByWellName,
} from 'features/wells/wellsSlice';

import GridLayout from 'components/Grid';
import { Loading } from 'components/Loading';
import RequestError from 'components/RequestError';
import SelectFiltragem from 'components/SelectFiltragem';

import { usePayload } from 'hooks/usePayload';

import WellNameCard from './components/WellNameCard';

interface WellsListOptions {
  value: number;
  label: string;
}

function WellsList() {
  const [wellsListOptions, setWellsListOptions] = useState<WellsListOptions[]>([] as WellsListOptions[]);
  // Handle Global State
  const dispatch = useDispatch();
  const { wellsList, selectedWell, filteredWellsList } = useSelector(wellsState);
  //

  // Handle MongoDB Request
  const payload = usePayload('pocos', 'GET');
  const wellsListRequest = useGetWellsListQuery(payload);
  //

  // Efeito para setar o estado global com os dados da requisição após a mesma ser concluída
  useEffect(() => {
    if (wellsListRequest.data?.documents) {
      const wellsList = wellsListRequest.data?.documents;
      const sortedWellsList = wellsList
        .map((well: Well) => well)
        .sort((a: Well, b: Well) => a.nome_poco.localeCompare(b.nome_poco));

      dispatch(setWellsList(sortedWellsList));
      dispatch(setInicialFilteredWellsList());
    }
  }, [wellsListRequest.data]);

  // Efeito para setar o estado local com o formato necessário para popular o select com os dados da requisição após a mesma ser concluída
  useEffect(() => {
    if (wellsList.length > 0) {
      setWellsListOptions(
        wellsList
          .map((well: Well) => ({ value: well._id, label: well.nome_poco }))
          .sort((a: WellsListOptions, b: WellsListOptions) => a.label.localeCompare(b.label)),
      );
    }
  }, [wellsList]);

  // Handle Loading
  const isLoading = wellsListRequest.isLoading || wellsListRequest.isFetching;
  if (isLoading) {
    return (
      <GridLayout>
        <Loading />
      </GridLayout>
    );
  }
  //

  // Handle Error
  const error = wellsListRequest.error;
  if (error) {
    return (
      <GridLayout>
        <RequestError />
      </GridLayout>
    );
  }
  //

  // Handle Success
  return (
    <GridLayout title={'LISTA DE POÇOS'}>
      <Flex direction={'column'} gap={5} justify={'start'} minW={'676px'}>
        <Flex align={'end'} gap={4}>
          <SelectFiltragem
            options={wellsListOptions}
            propName={'filtro'}
            selectLabel={'FILTRAR POR POÇO:'}
            value={selectedWell}
            dispatchAction={setSelectedWell}
          />
          <Button variant={'origemBlueOutline'} onClick={() => dispatch(filterByWellName(selectedWell))}>
            Filtrar
          </Button>
          <Button
            variant={'origemRedOutline'}
            onClick={() => {
              dispatch(setInicialFilteredWellsList());
              dispatch(
                setSelectedWell({
                  value: '',
                  label: '',
                }),
              );
            }}
          >
            Limpar Filtro
          </Button>
        </Flex>
        <Text fontWeight={700} fontSize={'18px'} color={'origem.500'}>
          Selecione um poço para visualizar o esquemático:
        </Text>
        <Flex justify={'center'} overflowX={'scroll'}>
          <Grid templateColumns={'repeat(2, 5fr)'} gap={5} justifyItems={'center'} width={'fit-content'}>
            {filteredWellsList.length > 0
              ? filteredWellsList.map((well: Well, index: number) => (
                  <GridItem key={index}>
                    <WellNameCard well={well} />
                  </GridItem>
                ))
              : null}
          </Grid>
        </Flex>
      </Flex>
    </GridLayout>
  );
  //
}

export default WellsList;
