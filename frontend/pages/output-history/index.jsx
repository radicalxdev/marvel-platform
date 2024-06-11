// pages/output-history/index.jsx

import MainAppLayout from '@/layouts/MainAppLayout';
import OutputHistory from '@/templates/OutputHistory/OutputHistoryPage';

const OutputHistoryPage = () => {
  return <OutputHistory />;
};

OutputHistoryPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default OutputHistoryPage;
