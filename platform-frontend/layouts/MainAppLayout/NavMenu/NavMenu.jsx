import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

import {
  leaderboardsRegex,
  homeRegex,
  rewardsRegex,
  settingsRegex,
  paymentsRegex,
  hackathonsRegex,
} from '@/regex/routes';

import ROUTES from '@/constants/routes';

import HomeIcon from '@/assets/svg/HomeIcon.svg';
import HackathonIcon from '@/assets/svg/hackathonSvg.svg';
import JoystickIcon from '@/assets/svg/joystick.svg';

import styles from './styles';

const PAGES = [
  {
    name: 'Missions',
    link: ROUTES.HOME,
    icon: <HomeIcon />,
    id: 'page_1',
  },
  {
    name: 'Hackathons',
    link: ROUTES.HACKATHONS,
    icon: <HackathonIcon />,
    id: 'page_2',
  },
  {
    name: 'Leaderboard',
    link: ROUTES.LEADERBOARDS,
    icon: <JoystickIcon />,
    id: 'page_3',
  },
];

/**
 * Returns a navigation menu component that displays a list of links.
 *
 * @return {JSX.Element} A React component that renders a navigation menu.
 */
const NavMenu = () => {
  const router = useRouter();
  const { pathname } = router;

  const setActive = (id) => {
    const isNotHomePage = [
      leaderboardsRegex.test(pathname),
      rewardsRegex.test(pathname),
      settingsRegex.test(pathname),
      paymentsRegex.test(pathname),
      hackathonsRegex.test(pathname),
    ].includes(true);

    if (id === 'page_1')
      return isNotHomePage ? false : homeRegex.test(pathname);

    if (id === 'page_2') return hackathonsRegex.test(pathname);

    return leaderboardsRegex.test(pathname);
  };

  const handleRoute = (link, id) => {
    router.push(link);
    setActive(id);
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.menuGridProps}>
        {PAGES.map((page) => (
          <MenuItem
            key={page.id}
            active={setActive(page.id).toString()}
            onClick={() => handleRoute(page.link, page.id)}
            {...styles.menuItemProps}
          >
            <Grid {...styles.innerMenuGridProps}>
              <Grid {...styles.menuIconGridProps}>{page.icon}</Grid>
              <Grid {...styles.menuTitleGridProps}>{page.name}</Grid>
            </Grid>
          </MenuItem>
        ))}
      </Grid>
    </Grid>
  );
};

export default NavMenu;
