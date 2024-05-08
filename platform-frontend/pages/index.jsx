import MainAppLayout from '@/layouts/MainAppLayout';
import HomePage from '@/templates/HomePage';

const Home = () => {
  return <HomePage />;
};

Home.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default Home;
