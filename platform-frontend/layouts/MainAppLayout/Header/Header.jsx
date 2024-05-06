import { Grid, useMediaQuery } from '@mui/material';

import styles from './styles';

/**
 * Renders the Header component with the given props.
 *
 * @param {Object} props - The props for the Header component.
 * @param {ReactNode} props.logo - The logo element.
 * @param {ReactNode} props.menu - The menu element.
 * @param {ReactNode} props.account - The account element.
 * @param {ReactNode} props.back - The back element.
 * @param {boolean} props.isPaymentPage - Whether the page is a payment page.
 * @param {number} props.height - The height of the component.
 * @param {boolean} props.isHackathonWorskpace - Whether the workspace is a hackathon workspace.
 * @param {boolean} props.isMissionWorkspace - Whether the workspace is a mission workspace.
 * @param {boolean} props.isLessonWorkspace - Whether the workspace is a lesson workspace.
 * @return {ReactNode} The rendered Header component.
 */
const Header = (props) => {
  const {
    logo,
    menu,
    account,
    back,
    isPaymentPage,
    isMissionWorkspace,
    height,
  } = props;

  const isMobileScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('tablet')
  );

  const shouldShowBack = isPaymentPage || isMissionWorkspace;

  const renderMobileView = () => {
    if (!isMobileScreen) return null;
    return (
      <>
        <Grid {...styles.subGridProps}>
          {shouldShowBack ? back : logo}
          {menu}
        </Grid>
        {account}
      </>
    );
  };

  const renderMainView = () => {
    if (isMobileScreen) return null;
    return (
      <>
        {shouldShowBack ? back : logo}
        {menu}
        {account}
      </>
    );
  };

  return (
    <Grid {...styles.mainGridProps(height)}>
      {renderMobileView()}
      {renderMainView()}
    </Grid>
  );
};

export default Header;
