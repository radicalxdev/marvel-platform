import { forwardRef } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { SelectElement } from 'react-hook-form-mui';

import styles from './styles';

/**
 * Generates a reusable selector component with a required title and an optional description.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholder - The placeholder for the input field.
 * @param {string} props.error - The error for the input field.
 * @param {string} props.control - The control for the input field.
 * @param {string} props.helperText - The helper text for the input field.
 * @param {string} props.displayEmpty - The display empty for the input field.
 * @param {array} props.menuList- The array of menu items that are needed in the drop down menu.
 * @param {array} props.bgColor - The background color of the input component.
 * @param {array} props.color- The color theme of the component.
 * @param {Object} props.extraInputProps- Additional props to be passed to the input component.
 *
 * @return {JSX.Element} - The rendered profile input field component.
 */
const PrimarySelectorInput = forwardRef((props, ref) => {
  const {
    id,
    label,
    placeholder,
    error,
    control,
    helperText,
    displayEmpty,
    menuList,
    bgColor,
    color,
    extraInputProps,
    ...otherProps
  } = props;

  const renderPlaceholder = (selected) => {
    if (selected?.length === 0)
      return (
        <Typography {...styles.placeholderProps}>{placeholder}</Typography>
      );

    return <Typography {...styles.selectedTextProps}>{selected}</Typography>;
  };

  const SelectMenuConfig = {
    id,
    name: id,
    control,
    inputRef: ref,
    label,
    helperText,
    options: menuList,
    InputLabelProps: styles.inputLabelProps,
    FormHelperTextProps: styles.helperTextProps(error),
    ...styles.selectInputProps(
      ExpandMoreIcon,
      bgColor,
      color,
      renderPlaceholder,
      displayEmpty,
      extraInputProps
    ),
  };

  return <SelectElement {...SelectMenuConfig} {...otherProps} />;
});

export default PrimarySelectorInput;
