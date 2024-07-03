import React from 'react';

import useHistoryProps from '@/hooks/useHistoryProps';

import MainAppLayout from '@/layouts/MainAppLayout';
import ToolHistoryPage from '@/templates/HistoryPage';

const HistoryPage = () => {
  const { categorizedData, loading, error } = useHistoryProps();

  return (
    <ToolHistoryPage data={categorizedData} loading={loading} error={error} />
  );
};

HistoryPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default HistoryPage;
