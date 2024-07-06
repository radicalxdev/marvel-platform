import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MainAppLayout from '@/layouts/MainAppLayout';
import HistoryPage from '@/templates/History';

import { auth, firestore } from '@/redux/store';

import fetchHistory from '@/redux/thunks/history';

const KaiHistory = () => {
  const { data, loading, error } = useSelector((state) => state.history);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchKaiHistory = async () => {
      const userId = auth.currentUser.uid;
      await dispatch(fetchHistory({ firestore, id: userId }));
    };

    if (!data) fetchKaiHistory();
  }, []);

  return <HistoryPage data={data} loading={loading} error={error} />;
};

KaiHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default KaiHistory;
