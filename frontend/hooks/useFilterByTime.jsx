import { useEffect, useState } from 'react';

import moment from 'moment';

/**
 * Custom hook that filters data by time and categorizes it into different time periods.
 *
 * @param {Array} data - The data to be filtered and categorized.
 * @return {Object} An object containing the categorized data, organized by time period.
 */
const useFilterByTime = (data) => {
  const [categorizedData, setCategorizedData] = useState({
    today: [],
    yesterday: [],
    previous7Days: [],
    previous30Days: [],
    monthsBefore: {},
  });

  // UseEffect hook to filter and categorize the data when the dependency (data) changes
  useEffect(() => {
    if (data) {
      const today = [];
      const yesterday = [];
      const previous7Days = [];
      const previous30Days = [];
      const monthsBefore = {};

      const now = moment();
      const startOfToday = now.clone().startOf('day');
      const startOfYesterday = now.clone().subtract(1, 'days').startOf('day');
      const startOfPrevious7Days = now
        .clone()
        .subtract(7, 'days')
        .startOf('day');
      const startOfPrevious30Days = now
        .clone()
        .subtract(30, 'days')
        .startOf('day');
      const startOfThisMonth = now.clone().startOf('month');

      // Iterate over each item in the data array
      data.forEach((item) => {
        // Get the created date and format it as "MM/DD/YYYY"
        const createdDate = moment(item.createdDate);
        const formattedDate = createdDate.format('MM/DD/YYYY');
        // Create a new item with the formatted date and push it to the appropriate array or object
        const newItem = { ...item, createdDate: formattedDate };

        if (createdDate.isSame(startOfToday, 'day')) {
          today.push(newItem);
        } else if (createdDate.isSame(startOfYesterday, 'day')) {
          yesterday.push(newItem);
        } else if (
          createdDate.isBetween(startOfPrevious7Days, startOfToday, 'day')
        ) {
          previous7Days.push(newItem);
        } else if (
          createdDate.isBetween(
            startOfPrevious30Days,
            startOfPrevious7Days,
            'day'
          )
        ) {
          previous30Days.push(newItem);
        } else if (createdDate.isSameOrBefore(startOfThisMonth, 'day')) {
          const monthKey = createdDate.format('MMMM YYYY'); // Format as "May 2024"
          if (!monthsBefore[monthKey]) {
            monthsBefore[monthKey] = [];
          }
          monthsBefore[monthKey].push(newItem);
        }
      });

      // Update the state with the categorized data
      setCategorizedData({
        today,
        yesterday,
        previous7Days,
        previous30Days,
        monthsBefore,
      });
    }
  }, [data]);

  // Return the categorized data
  return categorizedData;
};

export default useFilterByTime;
