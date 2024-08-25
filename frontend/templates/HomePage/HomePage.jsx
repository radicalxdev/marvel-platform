import { Grid, Typography } from '@mui/material';

import ToolsListingContainer from '@/components/ToolsListingContainer';

import styles from './styles';

const HomePage = (props) => {
  const { data, loading } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>
          Welcome to{' '}
          <Typography {...styles.highlightTextProps}>
            Marvel AI Tools
          </Typography>{' '}
          👋
        </Typography>
        <Typography {...styles.subtitleProps}>
          Made for{' '}
          <Typography {...styles.highlightTextProps}>educators</Typography>
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      <ToolsListingContainer
        data={data}
        loading={loading}
        category="All Tools"
      />
    </Grid>
  );
};
export default HomePage;
