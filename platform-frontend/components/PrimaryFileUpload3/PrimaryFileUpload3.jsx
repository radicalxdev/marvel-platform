import { forwardRef, useState } from 'react';

import { Close, FileUploadOutlined } from '@mui/icons-material';
import { ButtonBase, Typography } from '@mui/material';

import { AutocompleteElement } from 'react-hook-form-mui';

import styles from './styles';

/**
 * Creates a reusable file input component with a required title.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.error - The error state of this component.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.error - The error message for the input field.
 * @param {string} props.title - The title of the input field.
 * @param {string} props.color - The color of the input field.
 * @param {boolean} props.freeSolo - Whether the input field is free solo.
 * @param {string} props.color - The color of the input field.
 * @param {boolean} props.disableClearable - The property to disable clearable in the input field.
 * @param {string} props.bgColor - The background color of the input field.
 * @param {string} props.borderColor - The color of the border of the input field.
 * @param {Object} props.control - The control of the Input Text Field.
 * @param {Object} props.extraInputProps - The extraInputProps of the Input Text Field.
 * @param {Object} props.extraInputLabelProps - The extraInputLabelProps of the Input Text Field.
 *
 * @return {JSX.Element} - The rendered profile input field component.
 */
const PrimaryFileUpload = forwardRef((props, ref) => {
  const {
    id,
    name,
    error,
    placeholder,
    color,
    bgColor,
    helperText,
    borderColor,
    freeSolo,
    disableClearable,
    displayEmpty,
    multiple,
    handleOnChange,
    extraInputProps,
    extraInputLabelProps,
    ...otherProps
  } = props;

  const [files, setFiles] = useState([]);

  const handleCarouselFiles = (e) => {
    const selectedFiles = e.target.files;
    if (multiple) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    } else {
      setFiles(selectedFiles);
    }
  };

  const handleCarouselInput = () => {
    ref.current.click();
  };

  const renderPlaceholder = (selected) => {
    if (selected?.length === 0)
      return (
        <Typography {...styles.placeholderProps}>{placeholder}</Typography>
      );

    return <Typography {...styles.selectedTextProps}>{selected}</Typography>;
  };

  // const renderInput = () => {
  //   return <TextField disabled onClick={} />;
  // };

  const renderEndIcon = () => {
    return (
      <>
        {files.length > 0 && (
          <ButtonBase
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFiles([]);
            }}
            sx={{
              paddingRight: '0.5rem',
            }}
          >
            <Close />
          </ButtonBase>
        )}
        <ButtonBase>
          <FileUploadOutlined onClick={handleCarouselInput} />
        </ButtonBase>
      </>
    );
  };

  const TextFieldElementConfig = {
    id,
    name,
    multiple,
    autoComplete: 'off',
    options: Array.from(files),
    autocompleteProps: {
      freeSolo,
      disableClearable,
      ListboxProps: styles.listBoxProps(bgColor, color),
      onChange: handleOnChange,
      fullWidth: true,
      sx: { mt: 1, minWidth: '300px' },
    },
    textFieldProps: {
      placeholder,
      InputProps: styles.inputProps(
        error,
        extraInputProps,
        borderColor,
        handleOnChange,
        renderEndIcon(),
        handleCarouselInput,
        true
      ),
      InputLabelProps: styles.inputLabelProps(error, extraInputLabelProps),
      FormHelperTextProps: styles.helperTextProps(error),
      SelectProps: styles.SelectProps(
        color,
        bgColor,
        displayEmpty,
        // multiple,
        renderPlaceholder
      ),
      helperText,
    },
  };

  return (
    <>
      <AutocompleteElement
        // autocompleteProps={}
        // textFieldProps={{ SelectProps:  }}
        {...TextFieldElementConfig}
        {...otherProps}
      />
      <input
        type="file"
        ref={ref}
        style={{ display: 'none' }}
        onChange={handleCarouselFiles}
        multiple={multiple}
      />
    </>
  );
});

export default PrimaryFileUpload;
