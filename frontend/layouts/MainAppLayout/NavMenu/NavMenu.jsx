import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

import DiscoveryIcon from '@/assets/svg/add-block.svg';

import ChatBubble from '@/assets/svg/ChatBubbleV2.svg';
import HomeIcon from '@/assets/svg/HomeIconOutline.svg';

import ROUTES from '@/constants/routes';

import styles from './styles';

import { chatRegex, homeRegex } from '@/regex/routes';

const PAGES = [
  {
    name: 'Home',
    link: ROUTES.HOME,
    icon: <HomeIcon />,
    id: 'page_1',
  },
  {
    name: 'Discovery',
    link: ROUTES.CHAT, // TODO change this to actual discovery route
    icon: <DiscoveryIcon />,
    id: 'page_2',
  },
  {
    name: 'Chat',
    link: ROUTES.CHAT,
    icon: <ChatBubble />,
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
    const isNotHomePage = [chatRegex.test(pathname)].includes(true);

    if (id === 'page_1')
      return isNotHomePage ? false : homeRegex.test(pathname);

    return chatRegex.test(pathname);
  };

  const handleRoute = (link, id) => {
    router.push(link);
    setActive(id);
  };

  return (
    <Grid {...styles.mainGridProps}>
      {PAGES.map((page) => (
        <MenuItem
          key={page.id}
          onClick={() => handleRoute(page.link, page.id)}
          {...styles.menuItemProps(setActive(page.id))}
        >
          <Grid {...styles.innerMenuGridProps}>
            <Grid {...styles.menuIconGridProps}>{page.icon}</Grid>
            <Grid {...styles.menuTitleGridProps}>{page.name}</Grid>
          </Grid>
        </MenuItem>
      ))}
    </Grid>
  );
};

export default NavMenu;
