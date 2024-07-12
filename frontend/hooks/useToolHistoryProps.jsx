import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  fetchToolHistory,
  listenToToolHistory,
} from '@/redux/thunks/toolHistory';
import { categorizeDataByDate } from '@/utils/DateUtils';

const useToolHistoryProps = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.toolHistory);

  useEffect(() => {
    // Dispatch the thunk to fetch tool history data
    if (!data) {
      dispatch(fetchToolHistory());
    }

    // Set up a listener to update the tool history in real-time
    const unsubscribe = dispatch(listenToToolHistory());

    // Clean up the listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch, data]);

  // Categorize the data after it is fetched
  const categorizedData = categorizeDataByDate(data);

  return {
    categorizedData,
    loading,
    error,
  };
};

export default useToolHistoryProps;
