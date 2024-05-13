import { useRouter } from 'next/router';

import useToolProps from '@/hooks/useToolProps';

import MainAppLayout from '@/layouts/MainAppLayout';
import ToolPage, { ToolPageSkeleton } from '@/templates/ToolPage';

import CHALLENGES from '@/constants/challenges';
import ROUTES from '@/constants/routes';

/**
 * This component renders the ToolPage component.
 *
 * @return {JSX.Element} Returns the ToolPage component.
 */
const IndividualToolPage = () => {
  const router = useRouter();

  const { toolDoc, loading, ...toolProps } = useToolProps(CHALLENGES.MISSION);

  if (loading || !toolDoc) {
    if (!toolDoc && !loading) router.push(ROUTES.HOME);
    return <ToolPageSkeleton />;
  }

  return <ToolPage toolDoc={toolDoc} {...toolProps} />;
};

IndividualToolPage.getLayout = function getLayout(page) {
  return <MainAppLayout isToolPage>{page}</MainAppLayout>;
};

export default IndividualToolPage;
