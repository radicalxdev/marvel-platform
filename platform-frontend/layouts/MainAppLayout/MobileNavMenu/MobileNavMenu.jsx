import { MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

import PrimaryMenuSelector from '@/components/PrimaryMenuSelector';

import ROUTES from '@/constants/routes';
import {
  leaderboardsRegex,
  homeRegex,
  questsRegex,
  rewardsRegex,
} from '@/regex/routes';

import styles from './styles';

const MENU_ITEMS = [
  {
    value: ROUTES.HOME,
    label: (
      <>
        <span style={{ marginRight: '8px', WebkitTextFillColor: 'white' }}>
          🚀
        </span>
        Missions
      </>
    ),
    id: 'page_1',
  },
  {
    name: (
      <>
        <span id="icon">🎮</span>
        Quests
      </>
    ),
    value: ROUTES.HOME,
    id: 'page_2',
  },
  {
    value: ROUTES.LEADERBOARDS,

    label: (
      <>
        <span style={{ marginRight: '8px', WebkitTextFillColor: 'white' }}>
          🏆
        </span>
        Leaderboards
      </>
    ),
    id: 'page_3',
  },
  {
    id: 'page_3',
    value: ROUTES.REWARDS,
    label: (
      <>
        <span style={{ marginRight: '8px', WebkitTextFillColor: 'white' }}>
          💰
        </span>
        Rewards
      </>
    ),
  },
];

/**
 * Returns a dropdown menu for mobile navigation with menu items that can be clicked to navigate to different pages.
 *
 * @return {JSX.Element} The dropdown menu container component with custom menu drop items and menu item components.
 */
const MobileNavMenu = () => {
  const router = useRouter();
  const { pathname } = router;

  const setCurrentMenuItem = () => {
    if (
      (!leaderboardsRegex.test(pathname) ||
        pathname !== '/rewards' ||
        !questsRegex.test(pathname)) &&
      homeRegex.test(pathname)
    )
      return '/';

    if (questsRegex.test(pathname)) return '/quests';

    if (leaderboardsRegex.test(pathname)) return '/leaderboards';
    return rewardsRegex.test(pathname) && '/rewards';
  };

  const handleRoute = (route) => router.push(route);

  const renderMenuOptions = () => {
    return MENU_ITEMS.map((option) => (
      <MenuItem
        key={option.id}
        value={option.value}
        onClick={() => handleRoute(option.value)}
        variant="outlined"
        {...styles.menuItemProps}
      >
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <PrimaryMenuSelector
      value={setCurrentMenuItem()}
      defaultValue={MENU_ITEMS[0].value}
      renderOptions={renderMenuOptions}
    />
  );
};

export default MobileNavMenu;
