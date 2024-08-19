import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import { firestore } from '@/redux/store';
import fetchTools from '@/redux/thunks/tools';

/**
 * Returns properties used in the ToolPage component.
 *
 * @return {object} - An object containing  a single tool's props.
 */
const useToolProps = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { toolId },
  } = router;

  const { data: tools, loading } = useSelector((state) => state.tools);

  const toolDoc = tools?.find((tool) => tool?.maskedToolUrl === toolId);

  useEffect(() => {
    if (!tools) dispatch(fetchTools({ firestore }));
  }, []);

  return {
    loading,
    toolDoc,
  };
};

export default useToolProps;
