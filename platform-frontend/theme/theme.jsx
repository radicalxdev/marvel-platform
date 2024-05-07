/* eslint-disable no-dupe-keys */
import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
  palette: {
    50: 'rgba(236, 239, 241, 1)',
    100: 'rgba(207, 216, 220, 1)',
    200: 'rgba(176, 190, 197, 1)',
    300: 'rgba(144, 164, 174, 1)',
    400: 'rgba(120, 144, 156, 1)',
    500: 'rgba(96, 125, 139, 1)',
    600: 'rgba(84, 110, 122, 1)',
    700: 'rgba(69, 90, 100, 1)',
    800: 'rgba(55, 71, 79, 1)',
    900: 'rgba(38, 50, 56, 1)',
    mode: 'dark',
    primary: {
      main: 'rgba(105, 73, 255, 1)',
      contrastText: 'rgba(255, 255, 255, 0.87)',
    },
    secondary: {
      main: 'rgba(255, 193, 7, 1)',
      contrastText: 'rgba(255, 255, 255, 0.87)',
    },
    tertiary: {
      main: 'rgba(99,	53,	248, 0.87)',
      contrastText: 'rgba(99,	53,	248, 0.87)',
      contrast: 'rgba(99,	53,	248, 0.87)',
      Shades: {
        '8p': 'rgba(99,	53,	248, 0.08)',
        '12p': 'rgba(	99,	53,	248, 0.12)',
        '16p': 'rgba(	99,	53,	248, 0.16)',
        '30p': 'rgba(	99,	53,	248, 0.3)',
        '50p': 'rgba(	99,	53,	248, 0.5)',
      },
    },
    error: {
      main: 'rgba(244, 67, 54, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
    warning: {
      main: 'rgba(255, 167, 38, 1)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: 'rgba(18, 209, 142, 1)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: 'rgba(41, 182, 246, 1)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    action: {
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
    disabled: {
      main: 'rgba(189, 189, 189, 1)',
    },
    Text: {
      Primary: 'rgba(255, 255, 255, 1)',
      Secondary: 'rgba(255, 255, 255, 0.7)',
      Disabled: 'rgba(255, 255, 255, 0.5)',
      'Primary Shades': {
        '4p': 'rgba(0, 0, 0, 0.04)',
        '12p': 'rgba(255, 255, 255, 0.12)',
        '30p': 'rgba(255, 255, 255, 0.3)',
      },
      'Secondary Shades': {
        '4p': 'rgba(255, 255, 255, 0.04)',
        '18p': 'rgba(255, 255, 255, 0.18)',
      },
    },
    Primary: {
      Main: 'rgba(105, 73, 255, 1)',
      Contrast: 'rgba(255, 255, 255, 0.87)',
      Shades: {
        '8p': 'rgba(105, 73, 255, 0.08)',
        '12p': 'rgba(105, 73, 255, 0.12)',
        '16p': 'rgba(105, 73, 255, 0.16)',
        '30p': 'rgba(105, 73, 255, 0.3)',
        '50p': 'rgba(105, 73, 255, 0.5)',
      },
    },
    Secondary: {
      Main: 'rgba(255, 193, 7, 1)',
      Contrast: 'rgba(255, 255, 255, 0.87)',
      Shades: {
        '8p': 'rgba(255, 193, 7, 0.08)',
        '12p': 'rgba(255, 193, 7, 0.12)',
        '16p': 'rgba(255, 193, 7, 0.16)',
        '30p': 'rgba(255, 193, 7, 0.3)',
        '50p': 'rgba(255, 193, 7, 0.5)',
      },
    },
    Tertiary: {
      Main: 'linear-gradient(286.17deg, #6335F8 0%, #E71DE7 100%)',
      Contrast: 'rgba(99,	53,	248, 0.87)',
      Dark: 'linear-gradient(286.17deg, #3A1B9B 0%, #A011A0 100%)',
      Shades: {
        '8p': 'rgba(	99,	53,	248, 0.08)',
        '12p': 'rgba(	99,	53,	248, 0.12)',
        '16p': 'rgba(	99,	53,	248, 0.16)',
        '30p': 'rgba(	99,	53,	248, 0.3)',
        '50p': 'rgba(	99,	53,	248, 0.5)',
      },
    },
    Action: {
      'Hover (8p)': 'rgba(255, 255, 255, 0.08)',
      'Disabled Background (12p)': 'rgba(255, 255, 255, 0.12)',
      'Focus (12p)': 'rgba(255, 255, 255, 0.12)',
      'Selected (16p)': 'rgba(255, 255, 255, 0.16)',
      'Disabled (30p)': 'rgba(255, 255, 255, 0.3)',
      'Active (56p)': 'rgba(255, 255, 255, 0.56)',
    },
    Error: {
      Main: 'rgba(244, 67, 54, 1)',
      Contrast: 'rgba(255, 255, 255, 1)',
      Shades: {
        '8p': 'rgba(244, 67, 54, 0.08)',
        '12p': 'rgba(244, 67, 54, 0.12)',
        '30p': 'rgba(244, 67, 54, 0.3)',
        '50p': 'rgba(244, 67, 54, 0.5)',
        '160p': 'rgba(244, 67, 54, 1)',
        '190p': 'rgba(244, 67, 54, 1)',
      },
    },
    Warning: {
      Main: 'rgba(255, 167, 38, 1)',
      Contrast: 'rgba(0, 0, 0, 0.87)',
      Shades: {
        '8p': 'rgba(255, 167, 38, 0.08)',
        '12p': 'rgba(255, 167, 38, 0.12)',
        '30p': 'rgba(255, 167, 38, 0.3)',
        '50p': 'rgba(255, 167, 38, 0.5)',
        '160p': 'rgba(255, 167, 38, 1)',
        '190p': 'rgba(255, 167, 38, 1)',
      },
    },
    Info: {
      Main: 'rgba(41, 182, 246, 1)',
      Contrast: 'rgba(0, 0, 0, 0.87)',
      Shades: {
        '8p': 'rgba(2, 136, 209, 0.08)',
        '12p': 'rgba(2, 136, 209, 0.12)',
        '30p': 'rgba(2, 136, 209, 0.3)',
        '50p': 'rgba(2, 136, 209, 0.5)',
        '160p': 'rgba(2, 136, 209, 1)',
        '190p': 'rgba(2, 136, 209, 1)',
      },
    },
    Success: {
      Main: 'rgb(18, 209, 142, 1)',
      Contrast: 'rgba(0, 0, 0, 0.87)',
      Shades: {
        '8p': 'rgb(18, 209, 142, 0.08)',
        '12p': 'rgb(18, 209, 142, 0.12)',
        '30p': 'rgb(18, 209, 142, 0.3)',
        '50p': 'rgb(18, 209, 142, 0.5)',
        '160p': 'rgb(18, 209, 142, 1)',
        '190p': 'rgb(18, 209, 142, 1)',
      },
    },
    Background: {
      Default: 'rgba(18, 18, 18, 1)',
      primary: '#292B2F',
      purple: '#B791FF',
      orange: '#FFA800',
      red: '#FF5252',
      blue: '#50A0FF',
      green: '#1ED494',
      white: '#FFFFFF',
      Paper: {
        'Elevation 1': 'rgba(18, 18, 18, 1)',
      },
      gradient: {
        primary:
          'linear-gradient(180deg, #181A20 68%, rgba(24, 26, 32, 0.00) 115.44%)',
        yellow: 'linear-gradient(286.17deg, #FACC15 0%, #FFE580 100%)',
        teal: 'linear-gradient(286.17deg, #019B83 0%, #18C6AB 100%)',
        red: 'linear-gradient(286.17deg, #FF5A5F 0%, #FF8A9B 100%)',
        blue: 'linear-gradient(286.17deg, #246BFD 0%, #5089FD 100%)',
        blueDark: 'linear-gradient(286.17deg, #024ce5 0%, #0e5dfc 100%)',
        blue2: 'linear-gradient(286deg, #00F5A0 0%, #00D9F5 100%)',
        darkBlue: 'linear-gradient(90deg, #000428 0%, #004E92 100%)',
        purple: 'linear-gradient(286.17deg, #6949FF 0%, #876DFF 100%)',
        purple2: 'linear-gradient(286.17deg, #6335F8 0%, #E71DE7 100%)',
        purple2Reverse: 'linear-gradient(286.17deg, #E71DE7 0%, #6335F8 100%)',
        brown:
          'linear-gradient(286.17deg, rgb(218, 201, 200, 0.35) 0%, #000000 100%)',
        sunset: 'linear-gradient(286deg, #F9DB43 0%, #FD495E 100%)',
        green: 'linear-gradient(286deg, #12D18E 0%, #71E3BB 100%)',
      },
    },
    Dark_Colors: {
      Dark: {
        1: '#181A20',
        2: '#1F222A',
        3: '#262A35',
        4: '#35383F',
        5: '#242731',
      },
    },
    Greyscale: {
      900: '#212121',
      800: '#424242',
      780: '#555555',
      700: '#616161',
      650: '#646464',
      600: '#757575',
      500: '#9E9E9E',
      499: '#A8A8A8',
      498: '#898989',
      400: '#BDBDBD',
      300: '#E0E0E0',
      200: '#EEEEEE',
      100: '#F5F5F5',
      50: '#FAFAFA',
    },
    Common: {
      Black: {
        '4p': 'rgba(0, 0, 0, 0.04)',
        '12p': 'rgba(0, 0, 0, 0.12)',
        '30p': 'rgba(0, 0, 0, 0.3)',
        '100p': 'rgba(0, 0, 0, 1)',
      },
      White: {
        '8p': 'rgba(255, 255, 255, 0.08)',
        '12p': 'rgba(255, 255, 255, 0.12)',
        '30p': 'rgba(255, 255, 255, 0.3)',
        '90p': 'rgba(255, 255, 255, 0.9)',
        '100p': 'rgba(255, 255, 255, 1)',
      },
    },
  },
  typography: {
    h1: {
      fontStyle: 'normal',
      fontFamily: 'Satoshi Black',
      fontWeight: 300,
      fontSize: '96px',
      letterSpacing: '-1.44px',
      textDecoration: 'none',
      lineHeight: '116.70000553131104%',
      textTransform: 'none',
    },
    h2: {
      fontStyle: 'normal',
      fontFamily: 'Satoshi Bold',
      fontWeight: 300,
      fontSize: '60px',
      letterSpacing: '-0.3px',
      textDecoration: 'none',
      lineHeight: '120.00000476837158%',
      textTransform: 'none',
    },
    h3: {
      fontStyle: 'normal',
      fontFamily: 'Satoshi Medium',
      fontWeight: 400,
      fontSize: '48px',
      letterSpacing: '0px',
      textDecoration: 'none',
      lineHeight: '116.70000553131104%',
      textTransform: 'none',
    },
    'Body 1': {
      fontStyle: 'normal',
      fontFamily: 'Satoshi Regular',
      fontWeight: 400,
      fontSize: '16px',
      letterSpacing: '0.024000000953674317px',
      textDecoration: 'none',
      lineHeight: '150%',
      textTransform: 'none',
    },
    'Body 2': {
      fontStyle: 'normal',
      fontFamily: 'Satoshi Regular',
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: '0.023800000250339508px',
      textDecoration: 'none',
      lineHeight: '142.99999475479126%',
      textTransform: 'none',
    },
    'Subtitle 1': {
      fontStyle: 'normal',
      fontFamily: 'Satoshi Bold',
      fontWeight: 400,
      fontSize: '16px',
      letterSpacing: '0.024000000953674317px',
      textDecoration: 'none',
      lineHeight: '175%',
      textTransform: 'none',
    },
    'Subtitle 2': {
      fontStyle: 'normal',
      fontFamily: 'Satoshi Medium',
      fontWeight: 700,
      fontSize: '14px',
      letterSpacing: '0.2px',
      textDecoration: 'none',
      lineHeight: '157.00000524520874%',
      textTransform: 'none',
    },
    Overline: {
      fontStyle: 'normal',
      fontFamily: 'Satoshi Black',
      fontWeight: 400,
      fontSize: '12px',
      letterSpacing: '0.12px',
      textDecoration: 'none',
      lineHeight: '266.00000858306885%',
      textTransform: 'uppercase',
    },
  },
  customShadows: {
    Elevation: {
      1: { boxShadow: '8px 8px 0px rgb(38, 42, 53, 0.65)' },
      2: { boxShadow: '4px 4px 0px rgb(38, 42, 53, 0.65)' },
      // Custom Primary box shadow
      Primary: { boxShadow: '2px 2px 0px rgba(105, 73, 255, 0.65)' },
      Blue: { boxShadow: '2px 2px 0px rgb(30, 162, 228)' },
      Error: { boxShadow: '2px 2px 0px rgb(255, 90, 95)' },
      // Custom Primary box shadow
      PrimaryHover: {
        boxShadow:
          '0px 1px 10px rgba(105, 73, 255, 0.12), 0px 4px 5px rgba(105, 73, 255, 0.14), 0px 2px 4px rgba(105, 73, 255, 0.2)',
      },
      BlueHover: {
        boxShadow:
          '0px 1px 10px rgba(30, 162, 228, 0.12), 0px 4px 5px rgba(30, 162, 228, 0.14), 0px 2px 4px rgba(30, 162, 228, 0.2)',
      },
      ErrorHover: {
        boxShadow:
          '0px 1px 10px rgba(255, 90, 95, 0.12), 0px 4px 5px rgba(255, 90, 95, 0.14), 0px 2px 4px rgba(255, 90, 95, 0.2)',
      },
      'Outlined Light': { boxShadow: '0px 0px 0px rgba(224, 224, 224, 1)' },
      'Outlined Dark': { boxShadow: '0px 0px 0px rgba(255, 255, 255, 0.12)' },
    },
  },
  breakpoints: {
    values: {
      mobileSmall: 320,
      mobileSmallPlus: 360,
      mobile: 576.5,
      tablet: 767.5,
      laptop: 1024,
      desktop: 1280,
      desktopMedium: 1440,
      desktopLarge: 1536,
      desktopExtraLarge: 1921,
    },
  },
});

const theme = createTheme(
  {
    components: {
      MuiButtonBase: { defaultProps: { disableRipple: true } },
      MuiButton: {
        variants: [
          {
            props: { variant: 'mission' },
            style: {
              background: globalTheme.palette.Tertiary.Main,
              boxShadow: globalTheme.customShadows.Elevation.Primary.boxShadow,
              color: 'rgba(255, 255, 255, 0.87)',
              transition: globalTheme.transitions.create('all'),
              '&:hover': {
                background: globalTheme.palette.Tertiary.Dark,
                boxShadow:
                  globalTheme.customShadows.Elevation.PrimaryHover.boxShadow,
                color: 'rgba(255, 255, 255, 0.87)',
              },
              '&:disabled': {
                backgroundColor: 'none',
                background:
                  globalTheme.palette.Action['Disabled Background (12p)'],
                boxShadow: globalTheme.customShadows.Elevation[2].boxShadow,
              },
            },
          },
          {
            props: { variant: 'payment-btn' },
            style: {
              background: globalTheme.palette.Background.gradient.blue2,
              color: 'rgba(0, 0, 0)',
              transition: globalTheme.transitions.create('all'),
              '&:hover': {
                background: globalTheme.palette.Tertiary.Dark,
                boxShadow:
                  globalTheme.customShadows.Elevation.PrimaryHover.boxShadow,
                color: 'rgba(255, 255, 255, 0.87)',
              },
              '&:disabled': {
                backgroundColor: 'none',
                background:
                  globalTheme.palette.Action['Disabled Background (12p)'],
                boxShadow: globalTheme.customShadows.Elevation[2].boxShadow,
              },
            },
          },
          {
            props: { variant: 'white' },
            style: {
              background: globalTheme.palette.Common.White['100p'],
              borderRadius: '100px',
              textTransform: 'capitalize',
              transition: globalTheme.transitions.create('all'),
              '&:hover': {
                background: globalTheme.palette.Common.White['90p'],
                cursor: 'pointer',
              },
              '&:disabled': {
                backgroundColor: 'none',
                background: globalTheme.palette.Common.White['100p'],
                color: globalTheme.palette.Greyscale[700],
              },
            },
          },
          {
            props: { variant: 'white', completed: 'true' },
            style: {
              background: globalTheme.palette.Common.White['100p'],
              borderRadius: '100px',
              textTransform: 'capitalize',
              boxShadow: '0px 7px 25px #3A1E5D',
              color: globalTheme.palette.Greyscale[498],
              transition: globalTheme.transitions.create('all'),
              '&:hover': {
                background: globalTheme.palette.Common.White['100p'],
                cursor: 'default',
              },
              '&:disabled': {
                backgroundColor: 'none',
                background: globalTheme.palette.Common.White['100p'],
                color: globalTheme.palette.Greyscale[700],
              },
            },
          },
          {
            props: { variant: 'white', registered: 'true' },
            style: {
              background: globalTheme.palette.Greyscale[780],
              borderRadius: '100px',
              textTransform: 'capitalize',
              color: globalTheme.palette.Common.White['100p'],
              transition: globalTheme.transitions.create('all'),
              '&:hover': {
                background: globalTheme.palette.Greyscale[780],
                cursor: 'default',
              },
            },
          },
          {
            props: { variant: 'green-btn-2' },
            style: {
              background: globalTheme.palette.Background.gradient.green,
              boxShadow: '0px 7px 25px #3A1E5D',
              height: '45px',
              color: 'rgba(0, 0, 0)',
              transition: globalTheme.transitions.create('all'),
              '&:hover': {
                background: 'linear-gradient(286deg, #40856C 0%, #53AD8E 100%)',
                boxShadow: 'none',
                color: 'white',
              },
              '&:disabled': {
                backgroundColor: 'none',
                background:
                  globalTheme.palette.Action['Disabled Background (12p)'],
                boxShadow: globalTheme.customShadows.Elevation[2].boxShadow,
              },
            },
          },
          {
            props: { variant: 'error' },
            style: {
              background: globalTheme.palette.Background.gradient.error,
              boxShadow: globalTheme.customShadows.Elevation.Error.boxShadow,
              color: 'rgba(255, 255, 255, 0.87)',
              '&:hover': {
                background: globalTheme.palette.Background.gradient.errorDark,
                boxShadow:
                  globalTheme.customShadows.Elevation.ErrorHover.boxShadow,
                color: 'rgba(255, 255, 255, 0.87)',
              },
              '&:disabled': {
                backgroundColor: 'none',
                background:
                  globalTheme.palette.Action['Disabled Background (12p)'],
                boxShadow: globalTheme.customShadows.Elevation[2].boxShadow,
              },
            },
          },
          {
            props: {
              variant: 'green-btn-1',
              active: 'true',
            },
            style: {
              background: globalTheme.palette.Common.White['100p'],
              color: '#3A1E5D',
              '&:hover': {
                background:
                  'linear-gradient(286.17deg, #004C41 0%, #0D7D68 100%)',
                boxShadow:
                  '0px 1px 10px rgba(18, 209, 142, 0.12), 0px 4px 5px rgba(18, 209, 142, 0.14), 0px 2px 4px rgba(18, 209, 142, 0.2)',
                color: 'rgba(0, 0, 0)',
              },
              '&:disabled': {
                background:
                  globalTheme.palette.Action['Disabled Background (12p)'],
                boxShadow: globalTheme.customShadows.Elevation[2].boxShadow,
              },
            },
          },
          {
            props: { variant: 'green-btn-1', complete: 'true' },
            style: {
              background: globalTheme.palette.Background.gradient.darkBlue,
              boxShadow: '4px 4px 0px rgba(67, 67, 67, 0.65)',
              color: 'rgba(255, 255, 255, 0.87)',
              '&:hover': {
                background:
                  'linear-gradient(286.17deg, #003A74 0%, #00031D 100%)',
                boxShadow:
                  '0px 1px 10px rgba(67, 67, 67, 0.12), 0px 4px 5px rgba(67, 67, 67, 0.14), 0px 2px 4px rgba(67, 67, 67, 0.2)',
                color: 'rgba(255, 255, 255, 0.87)',
                [globalTheme.breakpoints.down('tablet')]: {
                  boxShadow: '2px 2px 0px rgba(67, 67, 67, 0.65)',
                },
              },
              '&:disabled': {
                background:
                  globalTheme.palette.Action['Disabled Background (12p)'],
                boxShadow: globalTheme.customShadows.Elevation[2].boxShadow,
              },
            },
          },
          {
            props: {
              variant: 'green-btn-1',
              pre_enroll: 'true',
              registered: 'true',
            },
            style: {
              background: globalTheme.palette.Dark_Colors.Dark[1],
              border: '1px solid rgba(216, 216, 216, 0.40)',
              boxShadow: 'none',
              color: 'rgba(255, 255, 255, 0.87)',
              '&:hover': {
                background: globalTheme.palette.Dark_Colors.Dark[1],
                boxShadow: 'none',
                cursor: 'default',
              },
              '&:disabled': {
                background:
                  globalTheme.palette.Action['Disabled Background (12p)'],
                boxShadow: globalTheme.customShadows.Elevation[2].boxShadow,
              },
            },
          },
          {
            props: {
              variant: 'green-btn-1',
              is_full: 'true',
            },
            style: {
              background: globalTheme.palette.Dark_Colors.Dark[1],
              border: '1px solid rgba(216, 216, 216, 0.40)',
              boxShadow: 'none',
              color: 'rgba(255, 255, 255, 0.87)',
              '&:hover': {
                background: globalTheme.palette.Dark_Colors.Dark[1],
                boxShadow: 'none',
                cursor: 'default',
              },
              '&:disabled': {
                background:
                  globalTheme.palette.Action['Disabled Background (12p)'],
                boxShadow: globalTheme.customShadows.Elevation[2].boxShadow,
              },
            },
          },
        ],
      },
    },
  },
  globalTheme
);

export default theme;
