// OutputHistoryListContainer.js

import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import OutputHistoryCard from '../OutputHistoryCard';
import SlidePanel from '../SlidePanel/SlidePanel';

import styles from './styles';

import { transformToolData } from '@/utils/HistoryUtils';

const OutputHistoryListContainer = ({ data, loading }) => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);

  useEffect(() => {
    // Removed console logs
  }, [data, loading]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!data) return <Typography>No data available</Typography>;

  const handleOpenSidebar = (cardData) => {
    setSelectedCardData(cardData);
    setIsSidePanelOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidePanelOpen(false);
  };

  const renderSection = ({ text, size }) => (
    <Grid {...styles.headerGridProps}>
      <Typography {...styles.categoryTitleProps}>
        {text} ({size})
      </Typography>
    </Grid>
  );

  const renderCards = ({ category }) => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {data?.[category].map((item) => {
          const transformedData = transformToolData(
            item.tool_data,
            item.response,
            item.createdAt
          );

          // Pass only relevant props to OutputHistoryCard
          const { title, content, backgroundImageUrl, logo, creationDate } =
            transformedData;

          return (
            <OutputHistoryCard
              key={item.id}
              title={title}
              content={content}
              backgroundImageUrl={backgroundImageUrl}
              logo={logo}
              creationDate={creationDate}
              onOpen={() => handleOpenSidebar(transformedData)} // Pass full transformed data to SlidePanel
            />
          );
        })}
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    return (
      <>
        {data?.Week?.length > 0 && (
          <>
            {renderSection({
              text: 'This Week',
              size: data?.Week?.length,
            })}
            {renderCards({ category: 'Week' })}
          </>
        )}
        {data?.Month?.length > 0 && (
          <>
            {renderSection({
              text: 'This Month',
              size: data?.Month?.length,
            })}
            {renderCards({ category: 'Month' })}
          </>
        )}
        {data?.Year?.length > 0 && (
          <>
            {renderSection({
              text: 'This Year',
              size: data?.Year?.length,
            })}
            {renderCards({ category: 'Year' })}
          </>
        )}
        {data?.Older?.length > 0 && (
          <>
            {renderSection({
              text: 'Older',
              size: data?.Older?.length,
            })}
            {renderCards({ category: 'Older' })}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Grid {...styles.mainGridProps}>
        <Typography {...styles.titleProps}>History</Typography>
        {data ? (
          renderContent()
        ) : (
          <Grid {...styles.headerGridProps}>
            <Typography {...styles.categoryTitleProps}>
              History is currently empty. Start using our services to track your
              activities and view your history here.
            </Typography>
          </Grid>
        )}
      </Grid>
      <SlidePanel
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidebar}
        data={selectedCardData}
      />
    </>
  );
};

export default OutputHistoryListContainer;
