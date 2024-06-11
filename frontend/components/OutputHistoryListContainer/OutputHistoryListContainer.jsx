import React from 'react';

// Import additional components and hooks as needed
// import { YourComponent } from '@/components/YourComponent';
import { Grid, Typography } from '@mui/material';

import ToolCard from '../ToolCard';

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

  // Dummy Data
  const testDates = [
    { title: 'Project Start', date: new Date(2024, 5, 10) }, // June 10, 2024 - within this week
    { title: 'Team Meeting', date: new Date(2024, 5, 9) }, // June 9, 2024 - within this week
    { title: 'Client Call', date: new Date(2024, 5, 1) }, // June 1, 2024 - this month
    { title: 'Report Submission', date: new Date(2024, 5, 5) }, // June 5, 2024 - this month
    { title: 'Quarterly Review', date: new Date(2024, 2, 15) }, // March 15, 2024 - this year
    { title: 'New Year Planning', date: new Date(2024, 0, 20) }, // January 20, 2024 - this year
    { title: 'Christmas Party', date: new Date(2023, 11, 25) }, // December 25, 2023 - older
    { title: 'Independence Day', date: new Date(2022, 6, 4) }, // July 4, 2022 - older
    { title: 'End of Quarter', date: new Date(2021, 8, 30) }, // September 30, 2021 - older
    { title: 'Annual Meeting', date: new Date(2020, 10, 5) }, // November 5, 2020 - older
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

  const renderCards = ({ category }) => {
    return (
      <Grid {...styles.containerGridProps}>
        <Grid {...styles.innerListGridProps}>
          {historyOutput?.[category].map((tool) => (
            <ToolCard key={tool.title} name={tool.title} />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Typography {...styles.titleProps}>Output History</Typography>
      {renderSection({ text: 'This Week', size: historyOutput?.Week?.length })}
      {renderCards({ category: 'Week' })}
      {renderSection({
        text: 'This Month',
        size: historyOutput?.Month?.length,
      })}
      {renderCards({ category: 'Month' })}
      {renderSection({ text: 'This Year', size: historyOutput?.Year?.length })}
      {renderCards({ category: 'Year' })}
      {renderSection({ text: 'Older', size: historyOutput?.Older?.length })}
      {renderCards({ category: 'Older' })}
    </Grid>
  );
};

export default OutputHistoryListContainer;
