import { Grid } from '@mui/material';

import styles from './styles';

/**
 * Renders the Header component with the given props.
 *
 * @param {Object} props - The props for the Header component.
 * @param {ReactNode} props.logo - The logo element.
 * @param {ReactNode} props.menu - The menu element.
 * @param {ReactNode} props.logout - The logout element.
 * @return {ReactNode} The rendered Header component.
 */
const Header = (props) => {
  const { logo, menu, logout } = props;

  const renderMainView = () => {
    return (
      <>
        {logo}
        {menu}
        {logout}
      </>
    );
  };

  return <Grid {...styles.mainGridProps}>{renderMainView()}</Grid>;
};

export default Header;
