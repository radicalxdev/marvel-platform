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

import {
  convertToUnixTimestamp,
  formatToStandardDate,
} from '@/utils/FirebaseUtils';
import fetchYoutubeTitle from '@/utils/YoutubeUtils'; // Assuming fetchYoutubeTitle returns a Promise

const HistoryCard = (props) => {
  const {
    cardData,
    onSortByTitle,
    onSortByDate,
    onSortByDescription,
    onSortByToolId,
  } = props;
  const [openPreview, setOpenPreview] = useState(false);
  const [restructuredCardData, setRestructuredCardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let backgroundImgURL = '';
      let logoURL = '';
      let title = '';
      let description = '';
      const { createdAt, response, toolId } = cardData;
      const { inputs, outputs } = response;
      const formattedCreatedAt = formatToStandardDate(
        new Date(convertToUnixTimestamp(createdAt))
      );

      switch (toolId) {
        case '0':
          title = inputs.topic;
          description = `${inputs.num_questions} Multiple Choice questions about the topic: ${title}`;
          backgroundImgURL =
            'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
          logoURL =
            'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';
          break;
        case '1':
          try {
            title = await fetchYoutubeTitle(inputs.youtubeUrl);
            description = `Set of Flashcards about the youtube video: ${title}`;
            backgroundImgURL =
              'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
            logoURL =
              'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';
          } catch (error) {
            console.error('Error fetching YouTube title:', error);
          }
          break;
        default:
          break;
      }

      const restructuredData = {
        title,
        description,
        createdAt: formattedCreatedAt,
        outputs,
        backgroundImgURL,
        logoURL,
        toolId,
      };

      setRestructuredCardData(restructuredData);
    };

    fetchData();
  }, [cardData]);

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
