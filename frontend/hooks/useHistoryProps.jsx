import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '@/redux/store';
import { fetchHistory } from '@/redux/thunks/history';
import { categorizeDataByDate } from '@/utils/DateUtils';

const useHistoryProps = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.outputHistory);

  useEffect(() => {
    // Dispatch the thunk to fetch output history data
    if (!data) dispatch(fetchHistory({ firestore }));
  }, [dispatch, data]);

  // Categorize the data after it is fetched
  const categorizedData = categorizeDataByDate(data);

  return {
    categorizedData,
    loading,
    error,
  };
};

export default useHistoryProps;
