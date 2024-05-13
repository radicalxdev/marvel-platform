import { useContext } from 'react';

import { Grid, Typography, useTheme } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';
import { useDispatch, useSelector } from 'react-redux';

import useWatchFields from '@/hooks/useWatchFields';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import PrimaryFileUpload from '@/components/PrimaryFileUpload';
import PrimarySelectorInput from '@/components/PrimarySelectorInput';
import PrimaryTextFieldInput from '@/components/PrimaryTextFieldInput';

import { INPUT_TYPES } from '@/constants/inputs';
import ALERT_COLORS from '@/constants/notification';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';
import {
  setCommunicatorLoading,
  setPrompt,
  setResponse,
} from '@/redux/slices/toolsSlice';
import submitPrompt from '@/services/tools/submitPrompt';

const ToolForm = (props) => {
  const { inputs } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { handleOpenSnackBar } = useContext(AuthContext);

  const { communicatorLoading } = useSelector((state) => state.tools);

  const { register, control, handleSubmit, getValues, setValue, errors } =
    useWatchFields([]);

  const handleSubmitForm = async (values) => {
    try {
      console.log(values);
      dispatch(setPrompt(values));
      dispatch(setCommunicatorLoading(true));
      const response = await submitPrompt(values, dispatch);

      dispatch(setResponse(response));
      dispatch(setCommunicatorLoading(false));
    } catch (error) {
      dispatch(setCommunicatorLoading(false));
      handleOpenSnackBar(
        ALERT_COLORS.ERROR,
        error.message || 'Couldn\u0027t send prompt'
      );
    }
  };

  const renderTitleInput = (inputProps) => {
    const { name, label } = inputProps;
    return (
      <Grid key={name} {...styles.inputGridProps}>
        <PrimaryTextFieldInput
          id={name}
          name={name}
          title={label}
          error={errors?.[name]}
          control={control}
          placeholder="Enter Title"
          helperText={errors?.[name]?.message}
          validation={{
            required: 'Field is required',
          }}
          ref={register}
        />
      </Grid>
    );
  };

  const renderSelectorInput = (inputProps) => {
    const { name, label, max = 10 } = inputProps;

    const renderLabel = () => {
      return (
        <Grid {...styles.labelGridProps}>
          <Typography {...styles.labelProps(errors?.[name])}>
            {label}
          </Typography>
        </Grid>
      );
    };

    return (
      <Grid key={name} {...styles.inputGridProps}>
        <PrimarySelectorInput
          id={name}
          name={name}
          label={renderLabel()}
          displayEmpty
          color="purple"
          bgColor="#ffffff"
          placeholder="Enter No. of Questions"
          error={errors?.[name]}
          menuList={new Array(max)
            .fill()
            ?.map((item, index) => ({ id: index + 1, label: index + 1 }))}
          helperText={errors?.[name]?.message}
          control={control}
          ref={register}
          extraInputProps={{
            color: 'black',
          }}
          validation={{
            required: 'Please select an option.',
          }}
        />
      </Grid>
    );
  };

  const renderFileUpload = (inputProps) => {
    const { name, label } = inputProps;

    const files = getValues(name);

    return (
      <Grid key={name} {...styles.inputGridProps}>
        <PrimaryFileUpload
          id={name}
          name={name}
          multiple
          placeholder="Choose Files to Upload"
          label={label}
          error={errors?.[name]}
          helperText={errors?.[name]?.message}
          color="purple"
          bgColor="#ffffff"
          options={files?.map((item) => item?.name) || []}
          control={control}
          getValues={getValues}
          ref={register}
          showChips
          showCheckbox
          displayEmpty
          setValue={setValue}
          validation={{
            required: 'Please upload a file.',
            validate: {
              lessThanThree: (v) =>
                parseInt(v, 10) < 10 || 'Should be less than 3 files',
            },
          }}
        />
      </Grid>
    );
  };

  const renderActionButtons = () => {
    return (
      <Grid mt={4} {...styles.actionButtonGridProps}>
        <GradientOutlinedButton
          id="submitButton"
          bgcolor={theme.palette.Common.White['100p']}
          text="Generate"
          textColor={theme.palette.Common.White['100p']}
          loading={communicatorLoading}
          onHoverTextColor={theme.palette.Background.purple}
          type="submit"
          inverted
          {...styles.submitButtonProps}
        />
      </Grid>
    );
  };

  const SwitchInput = ({ inputProps }) => {
    switch (inputProps?.type) {
      case INPUT_TYPES.TEXT:
        return renderTitleInput(inputProps);
      case INPUT_TYPES.NUMBER:
        return renderSelectorInput(inputProps);
      case INPUT_TYPES.FILE:
        return renderFileUpload(inputProps);
      default:
        return null;
    }
  };

  return (
    <FormContainer
      FormProps={{
        id: 'tool-form',
      }}
      onSuccess={handleSubmit(handleSubmitForm)}
    >
      <Grid {...styles.formProps}>
        <Grid {...styles.mainContentGridProps}>
          {inputs?.map((input) => (
            <SwitchInput key={input?.name} inputProps={input} />
          ))}
        </Grid>
        {renderActionButtons()}
      </Grid>
    </FormContainer>
  );
};
export default ToolForm;
