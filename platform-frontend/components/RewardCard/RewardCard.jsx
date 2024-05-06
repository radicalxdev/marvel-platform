import { useState } from 'react';
import { Card, Grid, Skeleton, useTheme } from '@mui/material';
import Image from 'next/image';

import GradientOutlinedChip from '../GradientOutlinedChip';

import CoinsSvg from '@/assets/svg/coin.svg';

import styles from './styles';

/**
 * Returns a RewardCard component with an image and a chip displaying the amount of coins.
 *
 * @return {JSX.Element} The RewardCard component.
 */
const RewardCard = (props) => {
  const { image, coins } = props;

  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const renderImage = () => {
    return (
      <>
        {loading && <Skeleton {...styles.imageSkeleton} />}
        <Image
          src={image}
          onLoadingComplete={() => setLoading(false)}
          {...styles.imageProps}
        />
      </>
    );
  };

  const renderChip = () => (
    <Grid {...styles.chipGridConfig}>
      <GradientOutlinedChip
        color="yellow"
        bgcolor={theme.palette.Dark_Colors.Dark[1]}
        text={coins}
        size={2}
        icon={<CoinsSvg />}
        gap="0px"
      />
    </Grid>
  );

  return (
    <Grid {...styles.mainGridConfig}>
      <Card {...styles.cardConfig}>
        {renderImage()}
        {!loading && renderChip()}
      </Card>
    </Grid>
  );
};

export default RewardCard;
