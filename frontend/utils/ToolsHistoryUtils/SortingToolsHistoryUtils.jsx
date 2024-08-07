import moment from 'moment';

import ORDER from '@/constants/sortingOrder';

import { convertToUnixTimestamp } from '../FirebaseUtils';

const getCategorizedData = (sortedData) => {
  const now = moment();
  const startOfWeek = now.clone().startOf('week');
  const startOfMonth = now.clone().startOf('month');
  const startOfYear = now.clone().startOf('year');

  const thisWeek = [];
  const thisMonth = [];
  const thisYear = [];
  const beyondThisYear = [];

  sortedData.forEach((item) => {
    const itemDate = moment(convertToUnixTimestamp(item.updatedAt));

    if (itemDate.isSameOrAfter(startOfWeek)) {
      thisWeek.push(item);
    } else if (itemDate.isSameOrAfter(startOfMonth)) {
      thisMonth.push(item);
    } else if (itemDate.isSameOrAfter(startOfYear)) {
      thisYear.push(item);
    } else {
      beyondThisYear.push(item);
    }
  });
  return { thisWeek, thisMonth, thisYear, beyondThisYear };
};

const handleSort = (order, data) => {
  if (data.length <= 1) {
    return data;
  }
  // Create a copy of the array before sorting
  const dataCopy = [...data];
  const sortedData = dataCopy.sort((a, b) => {
    const dateA = convertToUnixTimestamp(a.updatedAt);
    const dateB = convertToUnixTimestamp(b.updatedAt);
    return order === ORDER.ASC ? dateA - dateB : dateB - dateA;
  });
  return sortedData;
};

export { getCategorizedData, handleSort };
