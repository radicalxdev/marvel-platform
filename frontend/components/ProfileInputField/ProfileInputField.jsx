import { forwardRef } from 'react';

import { TextFieldElement } from 'react-hook-form-mui';

import styles from './styles';

/**
 * Generates a profile input field component.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.placeholderText - The placeholder text for the input field.
 * @param {string} props.error - The error message for the input field.
 * @param {...otherProps} - Any additional props.
 * @return {JSX.Element} - The rendered profile input field component.
 */
const ProfileInputField = forwardRef((props, ref) => {
  const {
    id,
    label,
    placeholderText,
    showPassword,
    error,
    icon,
    style,
    control,
    helperText,
    state,
    regex,
    ...otherProps
  } = props;

  const TextFieldElementConfig = {
    id,
    name: id,
    control,
    color: state,
    InputProps: styles.inputProps(error, icon, showPassword),
    InputLabelProps: styles.inputLabelProps(error),
    fullWidth: true,
    label: helperText || label,
    autoComplete: 'off',
    placeholder: placeholderText,
    FormHelperTextProps: { error },
    sx: style,
  };

  return (
    <TextFieldElement
      inputRef={ref}
      {...TextFieldElementConfig}
      {...otherProps}
    />
  );
});

export default ProfileInputField;
