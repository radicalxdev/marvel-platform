import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MainAppLayout from '@/layouts/MainAppLayout';
import HistoryPage from '@/templates/HistoryPage';

import { firestore } from '@/redux/store';
import fetchTools from '@/redux/thunks/tools';

const KaiHistory = () => {
  const { data, loading, error, category } = useSelector(
    (state) => state.tools
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchKaiTools = async () => {
      await dispatch(fetchTools({ firestore }));
    };

    if (!data) fetchKaiTools();
  }, []);
  return (
    <HistoryPage
      data={data}
      loading={loading}
      error={error}
      category={category}
    />
  );
};

KaiHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default KaiHistory;
