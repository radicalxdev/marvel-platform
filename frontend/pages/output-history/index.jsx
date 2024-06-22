import React from 'react';

import { useRouter } from 'next/router';

import useOutputHistoryProps from '@/hooks/useOutputHistoryProps';

import MainAppLayout from '@/layouts/MainAppLayout';
import OutputHistory from '@/templates/OutputHistory/';

const OutputHistoryPage = () => {
  const router = useRouter();
  const { categorizedData, loading, error } = useOutputHistoryProps();

  // Redirect or handle the error state as needed
  if (error) {
    // For example, redirect to a different page or show an error message
    router.push('/error'); // Adjust this to your actual error handling route or logic
    return null;
  }

  return <OutputHistory data={categorizedData} loading={loading} />;
};

OutputHistoryPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default OutputHistoryPage;
