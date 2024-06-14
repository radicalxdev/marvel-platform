import { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import Image from 'next/image';

import styles from './styles';

const HistoryCard = (props) => {
  const { backgroundImgURL, title, logo, description, createdDate } = props;
  const [openSubScreen, setOpenSubScreen] = useState(false);

  const toggleSubScreen = () => {
    setOpenSubScreen(!openSubScreen);
  };

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image src={logo} alt="output history logo" {...styles.imageProps} />
      </Grid>
    );
  };

  const renderCardDetails = () => {
    return (
      <Grid>
        <Typography {...styles.dateProps}>{createdDate}</Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
        <Button {...styles.previewButtonProps} onClick={toggleSubScreen}>
          Preview
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.historyCardProps}>
        <CardMedia {...styles.cardProps(backgroundImgURL)}>
          {renderImage()}
        </CardMedia>
        <CardContent {...styles.cardContentProps}>
          {renderCardDetails()}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HistoryCard;
