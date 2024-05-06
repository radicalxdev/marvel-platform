import { Grid } from '@mui/material';

import MainAppLayout from '@/layouts/MainAppLayout';
import ListingsCard from '@/components/ListingsCard';
import QuestDialog from '@/components/QuestDialog';
import IntroductionCard from '@/components/IntroductionCard';

import styles from './styles';

/**
 * Renders the ListingsPage component with the provided props.
 *
 * @param {object} props - An object containing the following properties:
 *   @param {object} blockDialogProps - The properties for the block dialog
 *   @param {object} listingsCardProps - The properties for the listings card
 *   @param {object} introCardProps - The properties for the introduction card
 *
 * @return {JSX.Element} The rendered ListingsPage component
 */
const ListingsPage = (props) => {
  const { blockDialogProps, listingsCardProps, introCardProps } = props;

  return (
    <Grid {...styles.mainGridProps}>
      <IntroductionCard {...introCardProps} />
      <ListingsCard {...listingsCardProps} />
      <QuestDialog {...blockDialogProps} />
    </Grid>
  );
};

ListingsPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default ListingsPage;
