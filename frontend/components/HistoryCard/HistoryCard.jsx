import { useState } from 'react';

import { Button, Card, Grid, Typography } from '@mui/material';

import Image from 'next/image';

import HistoryDrawer from '../HistoryDrawer/HistoryDrawer';

import styles from './styles';

/**
 * Returns a History Card component with the image and the details of the previous tools created.
 */
const HistoryCard = (props) => {
  const { backgroundImgURL, title, logo, description, createdDate } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps}>
        <Image src={logo} alt="kai logo" {...styles.imageProps} />
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.dateProps}>{createdDate}</Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
        <Button {...styles.previewButtonProps} onClick={toggleDrawer}>
          Preview
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.historyCardProps}>
        <Card {...styles.cardProps(backgroundImgURL)}>{renderImage()}</Card>
        <Grid {...styles.toolDetailsGridProps}>{renderDetails()}</Grid>
      </Grid>
      <HistoryDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        createdDate={createdDate}
        title={title}
        description={description}
      />
    </Grid>
  );
};

export default HistoryCard;
