import React from 'react';

// Import additional components and hooks as needed
// import { YourComponent } from '@/components/YourComponent';
import { Grid, Typography } from '@mui/material';

import OutputHistoryCard from '../OutputHistoryCard';

import SlidePanel from '../SlidePanel/SlidePanel';

import styles from './styles';

import { categorizeDate } from '@/utils/DateUtils';

const OutputHistoryListContainer = (props) => {
  const { data, loading } = props;
  const [historyOutput, setHistoryOutput] = React.useState({
    Week: [],
    Month: [],
    Year: [],
    Older: [],
  });

  const [isSidePanelOpen, setIsSidePanelOpen] = React.useState(false);

  // Dummy Data
  const testDates = [
    {
      title: 'Project Start',
      date: new Date(2024, 5, 10),
      description: 'Meeting to discuss project progress.',
    }, // June 10, 2024 - within this week
    {
      title: 'Team Meeting',
      date: new Date(2024, 5, 9),
      description: 'Submission of the monthly report.',
    }, // June 9, 2024 - within this week
    {
      title: 'Client Call',
      date: new Date(2024, 5, 1),
      description: 'Annual Christmas celebration.',
    }, // June 1, 2024 - this month
    {
      title: 'Report Submission',
      date: new Date(2024, 5, 5),
      description: 'Review of quarterly performance.',
    }, // June 5, 2024 - this month
    {
      title: 'Quarterly Review',
      date: new Date(2024, 2, 15),
      description: 'Call with the client to review requirements.',
    }, // March 15, 2024 - this year
    {
      title: 'New Year Planning',
      date: new Date(2024, 0, 20),
      description: 'Planning session for the new year.',
    }, // January 20, 2024 - this year
    {
      title: 'Christmas Party',
      date: new Date(2023, 11, 25),
      description: 'Important milestone for the project.',
    }, // December 25, 2023 - older
    {
      title: 'Independence Day',
      date: new Date(2022, 6, 4),
      description: 'Celebration of national independence.',
    }, // July 4, 2022 - older
    {
      title: 'End of Quarter',
      date: new Date(2021, 8, 30),
      description: 'End of the financial quarter.',
    }, // September 30, 2021 - older
    {
      title: 'Annual Meeting',
      date: new Date(2020, 10, 5),
      description: 'Annual company-wide meeting.',
    }, // November 5, 2020 - older
  ];

  React.useEffect(() => {
    // Categorize the dates whenever currentDate changes
    const newHistoryOutput = {
      Week: [],
      Month: [],
      Year: [],
      Older: [],
    };

    testDates.forEach((item) => {
      const category = categorizeDate(item.date, new Date());
      newHistoryOutput[category].push(item);
    });

    setHistoryOutput(newHistoryOutput);
  }, []);

  const renderSection = ({ text, size }) => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {text} ({size})
        </Typography>
      </Grid>
    );
  };

  const handleOpenSidebar = () => {
    setIsSidePanelOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidePanelOpen(false);
  };

  const renderCards = ({ category }) => {
    return (
      <Grid {...styles.containerGridProps}>
        <Grid {...styles.innerListGridProps}>
          {historyOutput?.[category].map((tool) => (
            <OutputHistoryCard
              key={tool.title}
              {...tool}
              onOpen={handleOpenSidebar}
            />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid {...styles.mainGridProps}>
        <Typography {...styles.titleProps}>Output History</Typography>
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
      <SlidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidebar} />
    </>
  );
};

export default OutputHistoryListContainer;
