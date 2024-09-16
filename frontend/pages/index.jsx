import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import MainAppLayout from '@/layouts/MainAppLayout';
import HomePage from '@/templates/HomePage';

import withLayoutRedirect from '@/hoc/onboarding/withLayoutRedirect';
import { firestore } from '@/redux/store';
import fetchTools from '@/redux/thunks/tools';

const Home = () => {
  const { data, loading, error } = useSelector((state) => state.tools);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) dispatch(fetchTools({ firestore }));
  }, []);

  return <HomePage data={data} loading={loading} error={error} />;
};

// Home.getLayout = function getLayout(page) {
//   return <MainAppLayout>{page}</MainAppLayout>;
// };

export default withLayoutRedirect(Home);
