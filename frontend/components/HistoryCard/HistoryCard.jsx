import React, { useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import Image from 'next/image';

import HistoryPreview from '../HistoryPreview';

import styles from './styles';

const HistoryCard = (props) => {
  const {
    cardInstance,
    onSortByTitle,
    onSortByDate,
    onSortByDescription,
    onSortByToolId,
  } = props;
  const [openPreview, setOpenPreview] = useState(false);
  const [restructuredCardData, setRestructuredCardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const restructuredData = await cardInstance.initializeCard();
      setRestructuredCardData(restructuredData);
    };

    fetchData();
  }, [cardInstance]);

  /**
   * Function to toggle the preview state of the history card.
   */
  const togglePreview = () => {
    setOpenPreview(!openPreview);
  };

  /**
   * Function to render the details of the history card, including title, description, and a preview button.
   *
   * @return {JSX.Element} Rendered card details component
   */
  const renderCardDetails = () => {
    if (!restructuredCardData) {
      return null; // Handle case where data is still loading or not available
    }

    return (
      <Grid>
        <Typography
          component="span"
          onClick={onSortByDate}
          {...styles.dateProps}
        >
          {restructuredCardData.createdAt}
        </Typography>
        <Typography
          component="span"
          onClick={onSortByTitle}
          {...styles.titleProps}
        >
          {restructuredCardData.title}
        </Typography>
        <Typography
          component="span"
          onClick={onSortByDescription}
          {...styles.descriptionProps}
        >
          {restructuredCardData.description}
        </Typography>
        <Button {...styles.previewButtonProps} onClick={togglePreview}>
          Preview
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.historyCardProps}>
        <CardMedia
          {...styles.cardProps(restructuredCardData?.backgroundImgURL)}
        >
          <Grid {...styles.imageGridProps}>
            <Image
              src={restructuredCardData?.logoURL}
              alt="output history logo"
              onClick={onSortByToolId}
              {...styles.imageProps}
            />
          </Grid>
        </CardMedia>
        <CardContent {...styles.cardContentProps}>
          {renderCardDetails()}
        </CardContent>
      </Card>
      <HistoryPreview
        cardInstance={cardInstance}
        open={openPreview}
        togglePreview={togglePreview}
        createdAt={restructuredCardData?.createdAt}
        title={restructuredCardData?.title}
        description={restructuredCardData?.description}
        toolId={restructuredCardData?.toolId}
        outputs={restructuredCardData?.outputs}
      />
    </Grid>
  );
};

export default HistoryCard;
