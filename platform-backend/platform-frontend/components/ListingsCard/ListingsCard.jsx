import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import ChallengeCard from '@/components/ChallengeCard';

import ChallengeCardSkeleton from '@/components/ChallengeCardSkeleton';
import ErrorCard from '@/components/ErrorCard';

import { QUEST_FILTERS } from '@/constants/quests';

import ListingsFilters from './ListingsFilters';

import styles from './styles';

import { QuestProvider } from '@/context/QuestContext';

const DEFAULT_QUESTS = [
  {
    id: '1',
    coverImageUrl: '',
    entryFee: 0,
    estimatedTime: '',
    length: '1',
    level: '',
    players: {
      capacity: 50,
      total: 0,
    },
    prizePool: 0,
  },
  {
    id: '2',
    coverImageUrl: '',
    entryFee: 0,
    estimatedTime: '',
    length: '1',
    level: '',
    players: {
      capacity: 50,
      total: 0,
    },
    prizePool: 0,
  },
  {
    id: '3',
    coverImageUrl: '',
    entryFee: 0,
    estimatedTime: '',
    length: '1',
    level: '',
    players: {
      capacity: 50,
      total: 0,
    },
    prizePool: 0,
  },
  {
    id: '4',
    coverImageUrl: '',
    entryFee: 0,
    estimatedTime: '',
    length: '1',
    level: '',
    players: {
      capacity: 50,
      total: 0,
    },
    prizePool: 0,
  },
  {
    id: '5',
    coverImageUrl: '',
    entryFee: 0,
    estimatedTime: '',
    length: '1',
    level: '',
    players: {
      capacity: 50,
      total: 0,
    },
    prizePool: 0,
  },
  {
    id: '6',
    coverImageUrl: '',
    entryFee: 0,
    estimatedTime: '',
    length: '1',
    level: '',
    players: {
      capacity: 50,
      total: 0,
    },
    prizePool: 0,
  },
];

/**
 * Renders the ListingsCard component.
 *
 * @param {object} props - The props object containing data, loading, error, enrolledChallenges, and banner.
 * @return {JSX.Element} The rendered ListingsCard component.
 */
const ListingsCard = (props) => {
  const { data, loading, error, enrolledChallenges, isExpedition, toggleOpen } =
    props;

  const disableFilters = true;

  const filteredData = data?.filter((challenge) => challenge?.display);

  const [challengeStatus, setChallengeStatus] = useState(QUEST_FILTERS.LIVE);

  const isLoading = loading || !filteredData;
  const noChallengeFound = !loading && filteredData?.length === 0;
  const isError = !loading && error;
  const noDataFetched = !loading && !filteredData;

  const setNoFilteredChallengesText = () => {
    switch (challengeStatus) {
      case QUEST_FILTERS.LIVE:
        return 'No Live Challenges';
      case QUEST_FILTERS.UPCOMING:
        return 'No Upcoming Challenges';
      default:
        return 'No Past Challenges';
    }
  };

  const handleRetry = () => {};

  const renderErrorCard = () => {
    return (
      <ErrorCard message={error} buttonText="Try again" onRetry={handleRetry} />
    );
  };

  const renderNoChallengesAvailable = () => {
    return (
      <Grid {...styles.errorGridProps}>
        <ErrorCard
          message={setNoFilteredChallengesText()}
          buttonText="Try again"
          onRetry={handleRetry}
        />
      </Grid>
    );
  };

  const renderNoFilteredChallenges = () => {
    return (
      <Grid {...styles.noFilteredQuestsGridProps}>
        <Typography {...styles.noQuestsText}>
          {setNoFilteredChallengesText()}
        </Typography>
      </Grid>
    );
  };

  const renderChallengeCards = () => {
    return (
      <Grid {...styles.innerQuestsGridProps(data?.length)}>
        {isLoading
          ? DEFAULT_QUESTS.map((quest, index) => (
              <ChallengeCardSkeleton key={quest.id} index={index + 1} />
            ))
          : filteredData?.map((quest, index) => (
              <QuestProvider
                key={quest.id}
                data={{
                  quest,
                  enrolledChallenges,
                  toggleOpen,
                  allChallenges: data,
                  index: index + 1,
                }}
              >
                <ChallengeCard />
              </QuestProvider>
            ))}
      </Grid>
    );
  };

  const renderListingsFilters = () => {
    return (
      <ListingsFilters
        currentStatus={challengeStatus}
        setChallengeStatus={setChallengeStatus}
        data={filteredData}
        loading={loading}
        isExpedition={isExpedition}
      />
    );
  };

  return (
    <Grid {...styles.expeditionCardProps(disableFilters)}>
      {!disableFilters && renderListingsFilters()}
      {renderChallengeCards()}
      {noChallengeFound && renderNoFilteredChallenges()}
      {noDataFetched && renderNoChallengesAvailable()}
      {isError && renderErrorCard()}
    </Grid>
  );
};

export default ListingsCard;
