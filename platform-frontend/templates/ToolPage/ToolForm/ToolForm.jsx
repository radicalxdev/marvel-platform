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

import TOOLS from '@/constants/tools';

import styles from './styles';

import { AuthContext } from '@/providers/GlobalProvider';
import {
  setCommunicatorLoading,
  setPrompt,
  setResponse,
} from '@/redux/slices/toolsSlice';
import submitPrompt from '@/services/tools/submitPrompt';
import submitPromptV2 from '@/services/tools/submitPromptV2';

const ToolForm = (props) => {
  const { id, inputs, name: toolName } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { handleOpenSnackBar } = useContext(AuthContext);

  const isQuizify = toolName === TOOLS.GEMINI_QUIZIFY;

  const { communicatorLoading } = useSelector((state) => state.tools);
  const { data: userData } = useSelector((state) => state.user);

  const { register, control, handleSubmit, getValues, setValue, errors } =
    useWatchFields([]);

  const handleSubmitMultiForm = async (values) => {
    try {
      const { files, ...toolData } = values;

      const updateData = Object.entries(toolData).map(([name, value]) => ({
        name,
        value,
      }));
      dispatch(setPrompt(values));
      dispatch(setCommunicatorLoading(true));

      const response = await submitPromptV2(
        {
          tool_data: { tool_id: id, inputs: updateData },
          type: 'tool',
          user: {
            id: userData?.id,
            fullName: userData?.fullName,
            email: userData?.email,
          },
        },
        files
      );

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

  const handleSubmitForm = async (values) => {
    try {
      dispatch(setPrompt(values));
      dispatch(setCommunicatorLoading(true));

      const response = await submitPrompt(values);

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
    const { name: inputName, placeholder, label } = inputProps;
    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimaryTextFieldInput
          id={inputName}
          name={inputName}
          title={label}
          error={errors?.[inputName]}
          control={control}
          placeholder={placeholder}
          helperText={errors?.[inputName]?.message}
          validation={{
            required: 'Field is required',
          }}
          ref={register}
        />
      </Grid>
    );
  };

  const renderSelectorInput = (inputProps) => {
    const { name: inputName, label, placeholder, max = 10 } = inputProps;

    const renderLabel = () => {
      return (
        <Grid {...styles.labelGridProps}>
          <Typography {...styles.labelProps(errors?.[inputName])}>
            {label}
          </Typography>
        </Grid>
      );
    };

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimarySelectorInput
          id={inputName}
          name={inputName}
          label={renderLabel()}
          displayEmpty
          color="purple"
          bgColor="#ffffff"
          placeholder={placeholder}
          error={errors?.[inputName]}
          menuList={new Array(max)
            .fill()
            ?.map((item, index) => ({ id: index + 1, label: index + 1 }))}
          helperText={errors?.[inputName]?.message}
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
    const { name: inputName, label } = inputProps;

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimaryFileUpload
          id={inputName}
          name={inputName}
          multiple
          placeholder="Choose Files to Upload"
          label={label}
          error={errors?.[inputName]}
          helperText={errors?.[inputName]?.message}
          color="purple"
          bgColor="#ffffff"
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
                parseInt(v?.length, 10) < 10 || 'Should be less than 3 files',
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
      onSuccess={handleSubmit(
        isQuizify ? handleSubmitMultiForm : handleSubmitForm
      )}
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
