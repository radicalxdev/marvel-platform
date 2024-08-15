import MainAppLayout from '@/layouts/MainAppLayout';
import ToolHistoryPage from '@/templates/ToolHistoryPage';

const ToolOutputHistory = () => {
  return <ToolHistoryPage />;
};

ToolOutputHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ToolOutputHistory;
