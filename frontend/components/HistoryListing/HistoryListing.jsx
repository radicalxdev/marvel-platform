import { useState } from 'react';

import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';

import TOOLS_RENDERS from '@/constants/toolsRenders';

import HistoryCard from '../HistoryCard';

import { getCategorizedData, handleSort } from '@/utils/HistoryListingUtils';

import styles from './styles';
import ORDER from '@/constants/sortingOrder';

/**
 * Component for rendering a listing of history cards in a grid layout.
 *
 * @param {Object} props - Object containing the following properties:
 *  @param {Array} props.data - Array of data objects for each history card
 *
 * @return {JSX.Element} Rendered history listing component
 */
const HistoryListing = (props) => {
  const { data } = props;

  const { thisWeek, thisMonth, thisYear, beyondThisYear } =
    getCategorizedData(data);
  const [order, setOrder] = useState(ORDER.DESC);

  const thisWeekSortedData = handleSort(order, thisWeek);
  const thisMonthSortedData = handleSort(order, thisMonth);
  const thisYearSortedData = handleSort(order, thisYear);
  const beyondThisYearSortedData = handleSort(order, beyondThisYear);

  const renderSection = (title, items) =>
    items.length > 0 && (
      <Grid {...styles.mainSectionProps}>
        <Typography {...styles.sectionHeaderProps}>
          {title} ({items.length})
        </Typography>
        <Grid container spacing={3}>
          {items.map((item, index) => {
            const cardInstance = new TOOLS_RENDERS[item.toolId](item);
            return (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <HistoryCard cardInstance={cardInstance} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );

  const renderDropDownMenu = () => (
    <FormControl {...styles.formProps}>
      <Select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        {...styles.dropdownMenuProps}
      >
        <MenuItem value={ORDER.DESC}>Descending</MenuItem>
        <MenuItem value={ORDER.ASC}>Ascending</MenuItem>
      </Select>
    </FormControl>
  );

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
    <div {...styles.mainGridProps}>
      {renderDropDownMenu()}
      {renderSectionsInOrder()}
    </div>
  );
};

export default HistoryListing;
