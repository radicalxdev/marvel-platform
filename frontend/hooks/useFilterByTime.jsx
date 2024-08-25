import { useEffect, useState } from 'react';

import moment from 'moment';

/**
 * places the item in the correct index in the array
 *  @param {Array} array - the array to insert the item into
 *  @param {object} item - the item to insert
 *  @param {string} updatedAt - the timestamp of the item
 *  @returns the index where the item should be inserted
 */
const findIndexToInsert = (array, item, updatedAt) => {
  for (let i = 0; i < array.length; i += 1) {
    if (moment(array[i].updatedAt).isBefore(updatedAt)) {
      return i;
    }
  }
  return array.length;
};

/**
 * filters user data of the tool cards by the most recent timestamp of which it was udpated
 * @param {Array} data - user data of all of the tool cards they have created
 * @returns the categorized data as well as the boolean value to determine if they have any tools cards saved within their account.
 */
const useFilterByTime = (data) => {
  const [categorizedData, setCategorizedData] = useState(null);
  const [isHistoryEmpty, setIsHistoryEmpty] = useState(true);

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

      data?.forEach((item) => {
        const updatedAt = item.updatedAt && moment.unix(item.updatedAt.seconds); // Correctly access seconds
        if (!updatedAt) return;

        if (updatedAt.isSame(startOfToday, 'day')) {
          today.push(item);
        } else if (updatedAt.isSame(startOfYesterday, 'day')) {
          yesterday.push(item);
        } else if (
          updatedAt.isBetween(startOfPrevious7Days, startOfToday, 'day', '[]')
        ) {
          previous7Days.push(item);
        } else if (
          updatedAt.isBetween(
            startOfPrevious30Days,
            startOfPrevious7Days,
            'day',
            '[]'
          )
        ) {
          previous30Days.push(item);
        } else if (updatedAt.isBefore(startOfThisMonth, 'day')) {
          const monthKey = updatedAt.format('MMMM YYYY');
          if (!monthsBefore[monthKey]) {
            monthsBefore[monthKey] = [];
          }
          const index = findIndexToInsert(
            monthsBefore[monthKey],
            item,
            updatedAt
          );
          monthsBefore[monthKey].splice(index, 0, item);
        }
      });

      const sortedMonthsBefore = Object.keys(monthsBefore).sort((a, b) => {
        return (
          moment(b, 'MMMM YYYY').valueOf() - moment(a, 'MMMM YYYY').valueOf()
        );
      });

      const sortedMonthsBeforeData = {};
      sortedMonthsBefore.forEach((monthKey) => {
        sortedMonthsBeforeData[monthKey] = monthsBefore[monthKey];
      });

      setCategorizedData({
        today: { title: 'Today', items: today },
        yesterday: { title: 'Yesterday', items: yesterday },
        previous7Days: { title: 'Previous 7 days', items: previous7Days },
        previous30Days: {
          title: 'Previous 30 days',
          items: previous30Days,
        },
        monthsBefore: { items: sortedMonthsBeforeData },
      });

      const historyEmpty =
        today.length === 0 &&
        yesterday.length === 0 &&
        previous7Days.length === 0 &&
        previous30Days.length === 0 &&
        Object.values(monthsBefore).every((timeData) => timeData.length === 0);
      setIsHistoryEmpty(historyEmpty);
    }
  }, [data]);

  return { ...categorizedData, isHistoryEmpty };
};

export default useFilterByTime;
