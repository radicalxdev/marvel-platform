// import { useContext } from 'react';

import { Grid, Typography, useTheme } from '@mui/material';
import { FormContainer } from 'react-hook-form-mui';

import useWatchFields from '@/hooks/useWatchFields';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import PrimaryFormSelectInput from '@/components/PrimaryFormSelectInput';

import PrimaryTextFieldInput from '@/components/PrimaryTextFieldInput';

import styles from './styles';

// import { AuthContext } from '@/providers/GlobalProvider';

const ToolForm = (props) => {
  const { inputs } = props;
  const theme = useTheme();
  //   const { handleOpenSnackBar } = useContext(AuthContext);

  const { register, control, handleSubmit, errors } = useWatchFields([]);

  //   const handleSubmitForm = async (values) => {
  //     try {
  //       setLoading(true);

  //       const { pinnedLinks } = values;

  //       await editSquadInfo({ pinnedLinks }, squadDoc?.id);

  //       setLoading(false);
  //       handleOpenSnackBar(ALERT_COLORS.SUCCESS, 'Updated squad successfully');

  //       dispatch(fetchSquads(firestore));
  //       toggleOpen();
  //     } catch (error) {
  //       setLoading(false);
  //       handleOpenSnackBar(
  //         ALERT_COLORS.ERROR,
  //         error.message || 'Couldn\u0027t update squad'
  //       );
  //     }
  //   };

  const renderNameInput = (inputProps) => {
    const { name, label } = inputProps;
    return (
      <Grid key={name} {...styles.inputGridProps}>
        <PrimaryTextFieldInput
          id={name}
          name={name}
          title={label}
          error={errors?.[name]}
          control={control}
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
        <PrimaryFormSelectInput
          id={name}
          name={name}
          label={renderLabel()}
          displayEmpty
          color="purple"
          bgColor="#ffffff"
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

  const renderActionButtons = () => {
    return (
      <Grid mt={4} {...styles.actionButtonGridProps}>
        <GradientOutlinedButton
          id="submitButton"
          bgcolor={theme.palette.Common.White['100p']}
          text="Generate"
          textColor={theme.palette.Common.White['100p']}
          //   loading={loading}
          onHoverTextColor={theme.palette.Background.purple}
          type="submit"
          inverted
          {...styles.submitButtonProps}
        />
      </Grid>
    );
  };

  return (
    <FormContainer
      FormProps={{
        id: 'tool-form',
      }}
      onSuccess={handleSubmit((values) => console.log(values))}
    >
      <Grid {...styles.formProps}>
        <Grid {...styles.mainContentGridProps}>
          {inputs?.map((input) =>
            input?.type === 'string'
              ? renderNameInput(input)
              : renderSelectorInput(input)
          )}
        </Grid>
        {renderActionButtons()}
      </Grid>
    </FormContainer>
  );
};
export default ToolForm;
