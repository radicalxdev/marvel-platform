import React, { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import OutputHistoryCard from '../OutputHistoryCard';
import SlidePanel from '../SlidePanel/SlidePanel';

import styles from './styles';

import { fetchOutputHistory } from '@/redux/thunks/output';
import { categorizeDate } from '@/utils/DateUtils';

const OutputHistoryListContainer = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.outputHistory);
  const [historyOutput, setHistoryOutput] = useState({
    Week: [],
    Month: [],
    Year: [],
    Older: [],
  });

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);

  useEffect(() => {
    dispatch(fetchOutputHistory());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      const newHistoryOutput = {
        Week: [],
        Month: [],
        Year: [],
        Older: [],
      };

      data.forEach((item) => {
        const category = categorizeDate(item.creationDate.toDate(), new Date());
        newHistoryOutput[category].push(item);
      });

      setHistoryOutput(newHistoryOutput);
    } else {
      // Clear the categorized output when there's no data
      setHistoryOutput({
        Week: [],
        Month: [],
        Year: [],
        Older: [],
      });
    }
  }, [data]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  const handleOpenSidebar = (cardData) => {
    setSelectedCardData(cardData); // Set the data for the selected card
    setIsSidePanelOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidePanelOpen(false);
  };

  const renderSection = ({ text, size }) => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {text} ({size})
        </Typography>
      </Grid>
    );
  };

  const renderCards = ({ category }) => {
    return (
      <Grid {...styles.containerGridProps}>
        <Grid {...styles.innerListGridProps}>
          {historyOutput?.[category].map((item) => (
            <OutputHistoryCard
              key={item.id}
              {...item}
              onOpen={handleOpenSidebar} // Pass the handler to the card
            />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid {...styles.mainGridProps}>
        <Typography {...styles.titleProps}>History</Typography>
        {renderSection({
          text: 'This Week',
          size: historyOutput?.Week?.length,
        })}
        {renderCards({ category: 'Week' })}
        {renderSection({
          text: 'This Month',
          size: historyOutput?.Month?.length,
        })}
        {renderCards({ category: 'Month' })}
        {renderSection({
          text: 'This Year',
          size: historyOutput?.Year?.length,
        })}
        {renderCards({ category: 'Year' })}
        {renderSection({ text: 'Older', size: historyOutput?.Older?.length })}
        {renderCards({ category: 'Older' })}
      </Grid>
      <SlidePanel
        isOpen={isSidePanelOpen}
        onClose={handleCloseSidebar}
        data={selectedCardData} // Pass the selected card data to the SlidePanel
      />
    </>
  );
};

export default OutputHistoryListContainer;
