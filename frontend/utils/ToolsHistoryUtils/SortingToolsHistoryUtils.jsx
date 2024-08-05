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
    const itemDate = moment(convertToUnixTimestamp(item.createdAt));

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
  if (data.length === 0 || data.length === 1) {
    return data;
  }
  const sortedData = data.sort((a, b) => {
    const dateA = convertToUnixTimestamp(a.createdAt);
    const dateB = convertToUnixTimestamp(b.createdAt);
    return order === ORDER.ASC ? dateA - dateB : dateB - dateA;
  });
  return sortedData;
};

export { getCategorizedData, handleSort };
