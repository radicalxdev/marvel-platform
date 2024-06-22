import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '@/redux/store';
import { fetchOutputHistory } from '@/redux/thunks/output';
import { categorizeDataByDate } from '@/utils/DateUtils';

const useOutputHistoryProps = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.outputHistory);

  useEffect(() => {
    // Dispatch the thunk to fetch output history data
    dispatch(fetchOutputHistory({ firestore }));
  }, [dispatch]);

  // Categorize the data after it is fetched
  const categorizedData = data
    ? categorizeDataByDate(data)
    : {
        Week: [],
        Month: [],
        Year: [],
        Older: [],
      };

  return {
    categorizedData,
    loading,
    error,
  };
};

export default useOutputHistoryProps;
