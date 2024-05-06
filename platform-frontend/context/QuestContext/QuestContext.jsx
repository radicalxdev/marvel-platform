import { createContext, useContext, useMemo } from 'react';
import STATUS from '@/constants/mission';

const QuestContext = createContext();

const QuestProvider = ({ children, data }) => {
  const memoizedValue = useMemo(() => {
    return data;
  }, [data]);

  return (
    <QuestContext.Provider value={memoizedValue}>
      {children}
    </QuestContext.Provider>
  );
};

const useQuestData = () => {
  const { quest, enrolledChallenges, allQuests, toggleOpen, index } =
    useContext(QuestContext);

  const {
    id,
    status: questStatus,
    startTime,
    endTime,
    isMaxCapacity,
    challengeGroupId,
  } = quest;

  const enrolledDoc = enrolledChallenges?.find((ec) => ec.challengeId === id);

  const questActive =
    questStatus === STATUS.IN_PROGRESS &&
    [STATUS.IN_PROGRESS, STATUS.NOT_STARTED].includes(enrolledDoc?.status);

  const questComplete =
    [STATUS.COMPLETED, STATUS.INCOMPLETE].includes(questStatus) ||
    [STATUS.COMPLETED, STATUS.INCOMPLETE].includes(enrolledDoc?.status);

  const isFullCapacity = isMaxCapacity && !enrolledDoc && !questComplete;
  const preEnroll = Date.now() < startTime;
  const timeUp = Date.now() > endTime;

  let similarQuestMaskedId;

  const isAlreadyEnrolledInChallengeGroup =
    enrolledChallenges &&
    Object.keys(enrolledChallenges)?.some((enrolledQuestChallengeId) => {
      const currentQuestChallengeId = challengeGroupId;

      const similarQuestFound = allQuests?.find(
        (questDoc) =>
          enrolledQuestChallengeId === questDoc.id &&
          questDoc.challengeGroupId === currentQuestChallengeId
      );

      if (similarQuestFound) similarQuestMaskedId = similarQuestFound?.maskedId;

      return !!similarQuestFound;
    });

  const isMiddleCard = (index - 2) % 3 === 0;

  return {
    ...quest,
    isMiddleCard,
    preEnroll,
    timeUp,
    questComplete,
    questActive,
    isFullCapacity,
    toggleOpen,
    isAlreadyEnrolledInChallengeGroup,
    similarQuestMaskedId,
  };
};

const useEnrolledQuest = () => {
  const {
    quest: { id },
    enrolledChallenges,
  } = useContext(QuestContext);

  return enrolledChallenges?.find((ec) => ec.challengeId === id);
};

export { QuestProvider, useQuestData, useEnrolledQuest };
