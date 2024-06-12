import MainAppLayout from '@/layouts/MainAppLayout';
import HistoryPage from '@/templates/History';

const KaiHistory = () => {
  return <HistoryPage />;
};

KaiHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default KaiHistory;