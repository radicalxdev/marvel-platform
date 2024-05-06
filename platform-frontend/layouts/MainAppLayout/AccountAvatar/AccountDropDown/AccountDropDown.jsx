import { Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { auth } from '@/redux/store';

import SubscribedIcon from '@/assets/svg/IndicatorIcon.svg';
import ROUTES from '@/constants/routes';
import { STRIPE_ROLE } from '@/constants/roles';

import { setIntercom } from '@/utils/IntegrationUtils';

import styles from './styles';

/**
 * Renders an account dropdown menu.
 *
 * @param {Object} props - The properties for the component.
 * @param {Object} props.anchor - The anchor element for the dropdown menu.
 * @param {Function} props.close - The function to close the dropdown menu.
 * @return {JSX.Element} The rendered account dropdown menu.
 */
const AccountDropDown = (props) => {
  const router = useRouter();
  const { anchor, close } = props;

  const claims = useSelector((state) => state.auth.data?.claims);
  const { data: userData } = useSelector((state) => state.user);
  const isPaidPlan = [
    STRIPE_ROLE.PRO,
    STRIPE_ROLE.ULTRA,
    STRIPE_ROLE.LITE,
  ].includes(claims?.stripeRole);

  const handleSignOutUser = () => {
    setIntercom('hide');
    signOut(auth);
  };

  const handleGoToSettings = () => {
    router.push(ROUTES.SETTINGS).finally(() => {
      close();
    });
  };

  const handleOpenProfile = () => {
    return null;
  };

  const renderCurrentPlan = () => {
    return (
      <>
        {isPaidPlan && <SubscribedIcon />}
        <Typography
          color={isPaidPlan ? 'white' : '#B3B3B3'}
          {...styles.planTypeTextProps}
        >
          {isPaidPlan ? `${claims?.stripeRole} Plan` : 'Free Plan'}
        </Typography>
      </>
    );
  };

  const renderDisplayName = () => {
    return (
      <Grid {...styles.displayNameGridProps}>
        <Grid {...styles.nameGridProps}>
          <Typography {...styles.nameTextProps}>
            {userData?.fullName}
          </Typography>
        </Grid>
        <Grid {...styles.planTypeGridProps(isPaidPlan)}>
          {renderCurrentPlan()}
        </Grid>
      </Grid>
    );
  };

  const renderMenuText = (text) => {
    return (
      <Typography color="white" {...styles.planTypeTextProps}>
        {text}
      </Typography>
    );
  };

  const menuItems = [
    {
      id: 'displayName',
      label: renderDisplayName(),
      onClick: handleOpenProfile,
      divider: true,
    },
    {
      id: 'settings',
      label: renderMenuText('Settings'),
      onClick: handleGoToSettings,
      clickable: true,
    },
    {
      id: 'logout',
      label: renderMenuText('Logout'),
      onClick: handleSignOutUser,
      divider: false,
      clickable: true,
    },
  ];

  return (
    <Menu
      anchorEl={anchor}
      id="account-menu"
      open={!!anchor}
      onClose={close}
      {...styles.popUpMenuProps}
    >
      {menuItems.map((menuItem) => (
        <Grid key={menuItem.id}>
          <MenuItem
            key={menuItem.label}
            label={menuItem.label}
            onClick={menuItem.onClick}
            divider={menuItem.divider}
            {...styles.menuItemProps(menuItem.clickable)}
          >
            {menuItem.label}
          </MenuItem>
          {menuItem.divider && <Divider {...styles.dividerProps} />}
        </Grid>
      ))}
    </Menu>
  );
};

export default AccountDropDown;
