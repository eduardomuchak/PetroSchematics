import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { Well } from 'features/wells/interfaces';
import { useGetWellsListQuery } from 'features/wells/service/wellsApi';
import { setWellsList, wellsState } from 'features/wells/wellsSlice';

import GridLayout from 'components/Grid';
import RequestError from 'components/RequestError';
import { RingLoading } from 'components/RingLoading';

import { usePayload } from 'hooks/usePayload';

import WellNameCard from './components/WellNameCard';

function WellsList() {
  // Handle Global State
  const dispatch = useDispatch();
  const { wellsList } = useSelector(wellsState);
  //

  // Handle MongoDB Request
  const payload = usePayload('pocos', 'GET');
  const wellsListRequest = useGetWellsListQuery(payload);
  //

  useEffect(() => {
    if (wellsListRequest.data?.documents) {
      dispatch(setWellsList(wellsListRequest.data?.documents));
    }
  }, [wellsListRequest.data]);

  // Handle Loading
  const isLoading = wellsListRequest.isLoading || wellsListRequest.isFetching;
  if (isLoading) {
    return (
      <GridLayout>
        <RingLoading />
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
    <GridLayout>
      <Flex justify={'center'} h={'77vh'} overflowX={'scroll'}>
        <Grid templateColumns={'repeat(2, 5fr)'} gap={5} justifyItems={'center'} width={'fit-content'}>
          {wellsList.length > 0
            ? wellsList.map((well: Well, index: number) => (
                <GridItem key={index}>
                  <WellNameCard well={well} />
                </GridItem>
              ))
            : null}
        </Grid>
      </Flex>
    </GridLayout>
  );
  //
}

export default WellsList;
