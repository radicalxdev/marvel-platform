import { Grid } from '@mui/material';

import HeaderCard from './HeaderCard';
import RewardsListingCard from '@/components/RewardsListingCard';

import REWARDS from '@/constants/rewards';

import styles from './styles';

/**
 * Renders the Rewards component.
 *
 * @return {JSX.Element} The rendered Rewards component.
 */
const Rewards = () => {
  return (
    <Grid {...styles.mainGridProps}>
      <HeaderCard />
      {Object.values(REWARDS).map((expedition) => (
        <RewardsListingCard
          key={expedition.id}
          id={expedition.id}
          banner={expedition.banner}
          data={expedition.cards}
        />
      ))}
    </Grid>
  );
};

export default Rewards;
