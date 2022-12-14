import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      <h1>Lista de Poços</h1>
      {wellsList.length > 0
        ? wellsList.map((well: Well, index: number) => <WellNameCard well={well} key={index} />)
        : null}
    </GridLayout>
  );
  //
}

export default WellsList;
