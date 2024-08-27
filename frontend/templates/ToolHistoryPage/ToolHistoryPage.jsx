import { Grid, Typography } from '@mui/material';
import Link from 'next/link';

import { useSelector } from 'react-redux';

import useFilterByTime from '@/hooks/useFilterByTime';

import ToolHistoryListingContainer from '@/components/ToolHistoryListingContainer';

import ROUTES from '@/constants/routes';

import styles from './styles';

const ToolHistoryPage = () => {
  const { data, loading } = useSelector((state) => state.toolHistory);

  const { isHistoryEmpty, ...categorizedData } = useFilterByTime(data);

  const renderTitle = () => (
    <Grid {...styles.titleGridProps}>
      <Typography {...styles.titleProps}>Tool History</Typography>
    </Grid>
  );

  const renderEmptyMessage = () => (
    <Grid {...styles.emptyMessageGridProps}>
      <Typography {...styles.emptyMessageProps}>
        Looks like you haven&apos;t explored history yet. Time to make some!
      </Typography>
      <Typography {...styles.emptyMessageLinkProps}>
        <Link href={ROUTES.HOME} passHref>
          Explore Tools
        </Link>
      </Typography>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {isHistoryEmpty
        ? renderEmptyMessage()
        : Object.values(categorizedData || {}).map((timeData) => (
            <ToolHistoryListingContainer
              key={timeData.title}
              data={timeData.items}
              loading={loading}
              category={timeData.title}
            />
          ))}
    </Grid>
  );
};

export default ToolHistoryPage;
