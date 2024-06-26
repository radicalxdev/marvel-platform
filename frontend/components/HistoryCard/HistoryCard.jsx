import React, { useState } from 'react';

import { Button, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import HistoryDrawer from '../HistoryDrawer/HistoryDrawer';

import styles from './styles';

import { truncateString } from '@/utils/MiscellaneousUtils';

const HistoryCard = (props) => {
  const { backgroundImgURL, title, logo, description, createdDate } = props;

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderImage = () => (
    <Grid {...styles.imageGridProps}>
      <Image src={logo} alt="Logo" {...styles.imageProps} />
    </Grid>
  );

  const renderDetails = () => (
    <Grid {...styles.contentGridProps}>
      <Typography {...styles.dateProps}>{createdDate}</Typography>
      <Typography {...styles.titleProps}>
        {title ? truncateString(title, 30) : ''}
      </Typography>
      <Typography {...styles.descriptionProps}>
        {description ? truncateString(description, 50) : ''}
      </Typography>

      <Button {...styles.previewButtonProps} onClick={toggleDrawer}>
        Preview
      </Button>
    </Grid>
  );

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
