import { useState } from 'react';

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import ORDER from '@/constants/sortingOrder';

import ToolsSessionHistoryCard from '../ToolsSessionHistoryCard';

import styles from './styles';

import {
  getCategorizedData,
  handleSort,
  initializeToolSessionData,
} from '@/utils/ToolsSessionHistoryUtils';

/**
 * Component for displaying tools session history with sorting functionality.
 * @param {Object} props - The props object containing data and setAlertState function.
 * @param {Object} props.data - The data to be displayed in the history.
 * @param {Function} props.setAlertState - A function to manage the state of alert notifications, enabling the display of success or error messages to the user.
 * @returns {JSX.Element} A JSX element representing the ToolsSessionHistoryListing component.
 */
const ToolsSessionHistoryListing = (props) => {
  // Destructuring props to extract data and setAlertState function
  const { data, setAlertState } = props;

  // Categorizing the data into different time periods
  const { thisWeek, thisMonth, thisYear, beyondThisYear } =
    getCategorizedData(data);
  // Setting up state for sorting order, default is descending
  const [order, setOrder] = useState(ORDER.DESC);

  // Sorting the categorized data based on the selected order
  const thisWeekSortedData = handleSort(order, thisWeek);
  const thisMonthSortedData = handleSort(order, thisMonth);
  const thisYearSortedData = handleSort(order, thisYear);
  const beyondThisYearSortedData = handleSort(order, beyondThisYear);

  /**
   * Function to render a section of data with a title
   */
  const renderSection = (title, sectionData) =>
    sectionData.length > 0 && (
      <Grid {...styles.mainSectionProps}>
        <Typography {...styles.sectionHeaderProps}>
          {title} ({sectionData.length})
        </Typography>
        <Grid container spacing={3}>
          {sectionData.map((toolSessionCardData, index) => {
            const toolSessionCardInstance =
              initializeToolSessionData(toolSessionCardData);
            return (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <ToolsSessionHistoryCard
                  cardInstance={toolSessionCardInstance}
                  setAlertState={setAlertState}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );

  /**
   * Function to render the dropdown menu for sorting options
   */
  const renderDropDownMenu = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <FormControl {...styles.formProps}>
        <InputLabel {...styles.labelProps}>Sort by</InputLabel>
        <Select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          {...styles.selectOptionsProps}
        >
          <MenuItem value={ORDER.DESC}>Descending</MenuItem>
          <MenuItem value={ORDER.ASC}>Ascending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );

  /**
   * Function to render the sections in the selected order
   */
  const renderSectionsInOrder = () => {
    if (order === ORDER.ASC) {
      return (
        <>
          {renderSection('Beyond This Year', beyondThisYearSortedData)}
          {renderSection('This Year', thisYearSortedData)}
          {renderSection('This Month', thisMonthSortedData)}
          {renderSection('This Week', thisWeekSortedData)}
        </>
      );
    }
    return (
      <>
        {renderSection('This Week', thisWeekSortedData)}
        {renderSection('This Month', thisMonthSortedData)}
        {renderSection('This Year', thisYearSortedData)}
        {renderSection('Beyond This Year', beyondThisYearSortedData)}
      </>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderDropDownMenu()}
      {renderSectionsInOrder()}
    </Grid>
  );
};

export default ToolsSessionHistoryListing;
