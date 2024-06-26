import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MainAppLayout from '@/layouts/MainAppLayout';
import HistoryPage from '@/templates/HistoryPage';

import { firestore } from '@/redux/store'; // Assuming firestore is correctly imported from redux store
import { fetchToolsHistory } from '@/redux/thunks/toolsHistory'; // Corrected import to include curly braces for named import

const KaiHistory = () => {
  const { data, loading, error } = useSelector((state) => state.toolsHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchKaiToolsHistory = async () => {
      console.log('Fetching tools history...');
      await dispatch(fetchToolsHistory({ firestore }));
    };

    if (!data) fetchKaiToolsHistory();
  }, []);

  console.log(
    'KaiHistory render - data:',
    data,
    'loading:',
    loading,
    'error:',
    error
  );

  return <HistoryPage data={data} loading={loading} error={error} />;
};

KaiHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default KaiHistory;
