import { Grid, Typography } from '@mui/material';

import RewardCard from '../RewardCard';

import styles from './styles';

/**
 * Renders the RewardsListingsCard component.
 *
 * @param {object} props - The props object containing data, enrolledChallenges, and banner.
 * @return {JSX.Element} The rendered RewardsListingsCard component.
 */
const RewardsListingsCard = (props) => {
  const { data, id: title } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>{title}</Typography>
      </Grid>
    );
  };

  const renderCards = () => {
    return (
      <Grid {...styles.innerCardProps(data.length)}>
        {data?.map((quest) => (
          <RewardCard key={quest.id} image={quest.image} coins={quest.coins} />
        ))}
      </Grid>
    );
  };

  return (
    <Grid {...styles.rewardsCardProps}>
      {renderTitle()}
      <Grid {...styles.containerGridProps}>{renderCards()}</Grid>
    </Grid>
  );
};

export default RewardsListingsCard;
