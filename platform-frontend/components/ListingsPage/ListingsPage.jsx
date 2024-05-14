import { Grid } from '@mui/material';

import IntroductionCard from '@/components/IntroductionCard';
import MainAppLayout from '@/layouts/MainAppLayout';

import styles from './styles';

/**
 * Renders the ListingsPage component with the provided props.
 *
 * @param {object} props - An object containing the following properties:
 *   @param {object} introCardProps - The properties for the introduction card
 *
 * @return {JSX.Element} The rendered ListingsPage component
 */
const ListingsPage = (props) => {
  const { introCardProps } = props;

  return (
    <Grid {...styles.mainGridProps}>
      <IntroductionCard {...introCardProps} />
    </Grid>
  );
};

ListingsPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ListingsPage;
