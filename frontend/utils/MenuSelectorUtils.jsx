import { useState } from 'react';

/**
 * Utiliy Function for managing menu selection state
 *
 * @returns the current state and handler methods of which the menu is considered open/closed
 */
const MenuSelectorUtils = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    isMenuOpen: Boolean(anchorEl),
    handleMenuOpen,
    handleMenuClose,
  };
};

export default MenuSelectorUtils;
