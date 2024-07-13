import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import HistoryCard from '../HistoryCard';

import { convertToUnixTimestamp } from '@/utils/FirebaseUtils';

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

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedArray = [...data].sort((a, b) => {
      if (property === 'createdAt') {
        const dateA = convertToUnixTimestamp(a.createdAt);
        const dateB = convertToUnixTimestamp(b.createdAt);
        return isAsc ? dateA - dateB : dateB - dateA;
      }
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });

    setSortedData(sortedArray);
  };

  const handleSortByTitle = () => handleSort('title');
  const handleSortByDate = () => handleSort('createdAt');
  const handleSortByDescription = () => handleSort('description');
  const handleSortByToolId = () => handleSort('toolId');

  return (
    <Grid container spacing={3}>
      {sortedData &&
        sortedData.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <HistoryCard
              cardData={item}
              onSortByTitle={handleSortByTitle}
              onSortByDate={handleSortByDate}
              onSortByDescription={handleSortByDescription}
              onSortByToolId={handleSortByToolId}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default HistoryListing;
