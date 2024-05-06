import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { resetChat } from '@/redux/slices/chatSlice';
import { ASSESSMENT_PAGES } from '@/constants/assessment';

/**
 * Generates the chat state for the chat component.
 *
 * @param {object} props - The props object containing the handleSubmit function.
 * @return {object} - An object containing the chat state.
 */
const useChatState = (initialPage, handleSubmit, isAssessment) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selected, setSelected] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  const isLoaderPage = currentPage === ASSESSMENT_PAGES.LOADER;
  const isQuestionsPage = currentPage === ASSESSMENT_PAGES.QUESTIONS;
  const isRulesPage = currentPage === ASSESSMENT_PAGES.RULES;

  useEffect(() => {
    setCurrentPage(initialPage);

    return () => {
      dispatch(resetChat());
    };
  }, [initialPage]);

  const handleTransition = (page) => setCurrentPage(page);
  const handleSubmitAnswer = (value) => {
    handleSubmit(selectedValue || value);

    if (isAssessment) {
      setSelected(null);
      setSelectedValue(null);
    }
  };

  return {
    currentPage,
    selected,
    setSelected,
    selectedValue,
    setSelectedValue,
    openChat,
    setOpenChat,
    isLoaderPage,
    isQuestionsPage,
    handleTransition,
    handleSubmitAnswer,
    isRulesPage,
  };
};

export default useChatState;
