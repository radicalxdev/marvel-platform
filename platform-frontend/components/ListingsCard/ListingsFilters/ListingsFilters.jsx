import { useState } from 'react';

import { Button, Grid, MenuItem } from '@mui/material';

import PrimaryMenuSelector from '@/components/PrimaryMenuSelector';

import ArrowDown from '@/assets/svg/ArrowDownPurple.svg';
import FireSvg from '@/assets/svg/fireSvg.svg';

import TimeSvg from '@/assets/svg/Time.svg';
import VerifiedSvg from '@/assets/svg/verifiedSvg.svg';

import {
  DIFFICULTY_LEVELS,
  EXPEDITIONS,
  QUEST_FILTERS,
} from '@/constants/quests';

import styles from './styles';

import questsStyles from '@/styles/questsStyles';

const STATUS_FILTERS = [
  {
    status: QUEST_FILTERS.LIVE,
    icon: <FireSvg />,
    text: 'Live',
  },
  {
    status: QUEST_FILTERS.UPCOMING,
    icon: <TimeSvg />,
    text: 'Upcoming',
  },
  {
    status: QUEST_FILTERS.PAST,
    icon: <VerifiedSvg />,
    text: 'Past',
  },
];

const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  ...Object.values(EXPEDITIONS),
];

/**
 * Renders the filters for the Listings Card component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.currentStatus - The status of the challenges being displayed.
 * @param {function} props.setChallengeStatus - A function to set the status of challenges displayed.
 * @param {function} props.setFilteredChallenges - A function to set the filtered challenges.
 * @param {Array} props.data - The data for the challenges.
 * @param {boolean} props.isExpedition - A flag indicating if it is an expedition.
 * @return {JSX.Element} The rendered component.
 */
const ListingsFilters = (props) => {
  const { currentStatus, setChallengeStatus, isExpedition } = props;

  const disableOtherFilters = false;

  const [activeCareerInterest, setActiveCareerInterest] = useState(
    CATEGORIES[0].id
  );
  const [activeDifficultyLevel, setActiveDifficultyLevel] = useState(
    DIFFICULTY_LEVELS.ALL.id
  );

  if (isExpedition) return null;

  const handleChangeStatusFilter = (status) => {
    setChallengeStatus(status);
  };

  const handleActiveCareerInterest = (activeCareerId) => {
    setActiveCareerInterest(activeCareerId);
  };

  const handleActiveDifficultyLevel = (difficultyId) => {
    setActiveDifficultyLevel(difficultyId);
  };

  const renderCareerInterestOptions = () => {
    return CATEGORIES.map((category) => (
      <MenuItem
        key={category.id}
        value={category.id}
        onClick={() => handleActiveCareerInterest(category.id)}
        {...questsStyles.menuItemProps}
      >
        {category.name}
      </MenuItem>
    ));
  };

  const renderDifficultyLevelOptions = () => {
    return Object.values(DIFFICULTY_LEVELS).map((difficulty) => (
      <MenuItem
        key={difficulty.id}
        value={difficulty.id}
        onClick={() => handleActiveDifficultyLevel(difficulty.id)}
        {...questsStyles.menuItemProps}
      >
        {difficulty.name}
      </MenuItem>
    ));
  };

  const renderStatusFilters = () => {
    return (
      <Grid {...styles.filtersGridProps}>
        {STATUS_FILTERS.map((button) => (
          <Button
            key={button.status}
            endIcon={button.icon}
            onClick={() => handleChangeStatusFilter(button.status)}
            {...styles.filterButtonProps(currentStatus === button.status)}
          >
            {button.text}
          </Button>
        ))}
      </Grid>
    );
  };

  const renderOtherFilters = () => {
    return (
      <Grid {...styles.filtersGridProps}>
        <PrimaryMenuSelector
          value={activeCareerInterest}
          defaultValue="all"
          renderOptions={renderCareerInterestOptions}
          darkValue={2}
          color="purple2"
          icon={ArrowDown}
          isLeaderboards
        />
        <PrimaryMenuSelector
          value={activeDifficultyLevel}
          defaultValue="all"
          renderOptions={renderDifficultyLevelOptions}
          darkValue={2}
          color="purple2"
          icon={ArrowDown}
          isLeaderboards
        />
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderStatusFilters()}
      {disableOtherFilters && renderOtherFilters()}
    </Grid>
  );
};

export default ListingsFilters;
