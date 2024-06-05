import { createTheme } from '@mui/material';
import uploadIcon from 'assets/file-upload-icon-2.svg';

const customTheme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',

    h1: {
      fontSize: '48px',
      fontWeight: '500',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '35px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '30px',
      },

      '@media (max-width: 570px)': {
        fontSize: '25px',
      },
    },

    h2: {
      fontSize: '45px',
      fontWeight: '500',
      textTransform: 'capitalize',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '32px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '28px',
      },

      '@media (max-width: 570px)': {
        fontSize: '22px',
      },
    },

    h3: {
      fontSize: '30px',
      fontWeight: '500',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '24px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '22px',
      },

      '@media (max-width: 570px)': {
        fontSize: '18px',
      },
    },

    h5: {
      fontSize: '24px',
      fontWeight: '500',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '20px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '18px',
      },

      '@media (max-width: 570px)': {
        fontSize: '16px',
      },
    },

    h6: {
      fontSize: '18px',
      fontWeight: '400',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '17px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '16px',
      },

      '@media (max-width: 570px)': {
        fontSize: '15px',
      },
    },

    desktopParagraph: {
      fontSize: '16px',
      fontFamily: 'Poppins, sans-serif',
    },

    body1: {
      fontSize: '16px',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    label: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '15px',
      color: '#422438',
      fontWeight: '500',

      '@media (max-width: 540px)': {
        fontSize: '14px',
      },
    },

    p: {
      '@media (min-width: 1650px) and (max-width: 1950px)': {
        fontSize: '18px',
      },
      '@media (min-width: 1950px)': {
        fontSize: '20px',
      },
    },

    cardPriceTitle: {},

    title: {
      fontSize: '20px',
      fontFamily: 'Poppins, sans-serif',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    caption: {
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
    },

    caption1: {
      fontSize: '13px',
      fontFamily: 'Poppins, sans-serif',
    },

    caption2: {
      fontSize: '12px',
      fontFamily: 'Poppins, sans-serif',
    },

    caption3: {
      fontSize: '10px',
      fontFamily: 'Poppins, sans-serif',
    },

    dashboardh1: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '24px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh2: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '20px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh3: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '18px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '15px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh4: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '19px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh5: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '18px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh6: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '16px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardBody: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '14px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '12px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '10px',
      },

      '@media (max-width: 570px)': {
        fontSize: '10px',
      },
    },

    dashboardCaption: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '15px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '12px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '10px',
      },

      '@media (max-width: 570px)': {
        fontSize: '10px',
      },
    },

    dashboardCaption2: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '12px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '10px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '8px',
      },

      '@media (max-width: 570px)': {
        fontSize: '8px',
      },
    },

    workspaceTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#422438',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '15px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    workspaceSubTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#422438',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '14px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '13px',
      },
    },

    countDownTimer: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '22px',
      fontWeight: '700',
      color: '#422438',
      background: '#ffe3c5',
      padding: '2px 5px',
      borderRadius: '5px',
      lineHeight: '22px',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '20px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '18px',
      },

      '@media (max-width: 570px)': {
        fontSize: '16px',
      },
    },

    overTimeTimer: {
      fontFamily: 'Roboto Mono !important',
      fontSize: '22px',
      fontWeight: '700',
      color: '#422438',
      background: '#FF7262',
      padding: '2px 5px',
      borderRadius: '5px',
      lineHeight: '22px',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '20px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '18px',
      },

      '@media (max-width: 570px)': {
        fontSize: '16px',
      },
    },

    timerLabel: {
      fontFamily: 'Roboto Mono !important',
      fontSize: '11px',
      fontWeight: '700',
      color: '#a0919b',

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '12px',
      },

      '@media (max-width: 570px)': {
        fontSize: '11px',
      },
    },

    professionLabel: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '10px',
      color: '#a0919b',

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '10px',
      },

      '@media (max-width: 570px)': {
        fontSize: '10px',
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 570,
      md: 768,
      lg: 991,
      xl: 1200,
      xxl: 1400,
      laptop: 1600,
      desktop: 1700,
    },
  },

  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: '#FFF2D0',
          color: '#422438',
          borderRadius: '20px',
          padding: '8px 28px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          boxShadow: 'none',
          textTransform: 'none',

          ':hover': {
            background: '#FFE3C5',
            color: '#422438',
            boxShadow: 'none',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '8px 25px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '6px 20px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '6px 18px',
            fontSize: '14px',
          },
        },

        outlinedPrimary: {
          borderColor: '#422438',
          color: '#422438',
          borderRadius: '20px',
          padding: '5px 30px',
          textTransform: 'capitalize',

          '&:hover': {
            borderColor: '#422438',
            background: '#ffe3c5',
            color: '#422438',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '5px 25px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '5px 20px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '5px 18px',
            fontSize: '14px',
          },
        },

        outlinedSecondary: {
          borderColor: '#FAC751',
          color: '#FAC751',
          borderRadius: '25px',
          padding: '12px 60px',
          textTransform: 'capitalize',

          '&:hover': {
            borderColor: '#FAC751',
            background: '#fbd273',
            color: '#422438',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '12px 24px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '10px 20px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '8px 18px',
            fontSize: '14px',
          },
        },

        containedSecondary: {
          background: '#FAC751',
          color: '#422438',
          borderRadius: '25px',
          padding: '12px 50px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          textTransform: 'capitalize',
          boxShadow: 'none',
          textAlign: 'center',

          ':hover': {
            background: '#fbd273',
            color: '#422438',
            boxShadow: 'none',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '12px 24px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '10px 20px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '8px 18px',
            fontSize: '14px',
          },
        },

        containedPurple: {
          background: '#422438',
          color: '#FFFFFF',
          borderRadius: '25px',
          padding: '12px 50px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          textTransform: 'capitalize',
          boxShadow: 'none',
          textAlign: 'center',

          ':hover': {
            background: '#FAC751',
            color: '#422438',
            boxShadow: 'none',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '12px 24px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '10px 20px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '8px 18px',
            fontSize: '14px',
          },
        },

        muted: {
          background: '#f2f2f2',
          color: '#a0919b',
          borderRadius: '5px',
          padding: '5px 15px',
          textTransform: 'capitalize',

          ':hover': {
            background: '#f2f2f2',
            color: '#a0919b',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '5px 15px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '5px 12px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '5px 10px',
            fontSize: '14px',
          },
        },

        success: {
          background: '#ebf9ed',
          borderRadius: '5px',
          padding: '5px 15px !Important',
          color: '#32C850',
          textTransform: 'capitalize',

          '&:hover': {
            background: '#d9eddb',
            color: '#32C859',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '5px 15px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '5px 12px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '5px 10px',
            fontSize: '14px',
          },
        },

        inRevision: {
          background: '#F6EBEC',
          borderRadius: '5px',
          padding: '5px 15px !Important',
          color: '#A23842',

          '&:hover': {
            background: '#feefef',
            color: '#D20000',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '5px 15px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '5px 12px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '5px 10px',
            fontSize: '14px',
          },
        },

        danger: {
          background: '#feefef',
          borderRadius: '5px',
          padding: '5px 20px',
          color: '#D20000',
          textTransform: 'capitalize',

          '&:hover': {
            background: '#feefef',
            color: '#D20000',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '5px 20px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '5px 12px',
          },

          '@media (max-width: 570px)': {
            padding: '5px 10px',
          },
        },

        file: {
          background: '#fbf9fa',
          fontWeight: '600',
          border: '1px dashed #ebe4e7',
          width: '100%',
          padding: '10px 20px',
          textTransform: 'capitalize',
          color: '#422438',
        },

        attachFile: {
          background: '#fbf9fa',
          fontWeight: '600',
          border: '1px dashed #ebe4e7',
          padding: '5px 20px',
          textTransform: 'capitalize',
          color: '#422438',
          alignItems: 'start',
          borderRadius: '20px',

          '&::before': {
            content: `url(${uploadIcon})`,
            paddingRight: '5px',
          },
        },
      },
    },

    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          padding: '5px',
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          padding: '4px 18px',
          textTransform: 'capitalize',
          background: '#ffffff',
          border: '2px solid white',
          fontFamily: 'Poppins, sans-serif',
          color: '#422438',

          '&:hover': {
            background: '#ffffff',
          },

          '&.Mui-selected': {
            backgroundColor: '#FAC751',
            color: '#422438',

            '&:hover': {
              backgroundColor: '#FAC751',
            },
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: 'none',
          border: '1px solid #cccfcd',
        },
      },
    },

    MuiContainer: {
      variants: [
        {
          props: { variant: 'portal' },
          style: {
            maxWidth: '1950px !important',

            '@media (min-width: 991px)': {
              width: '100%',
              maxWidth: '100%',
              padding: '70px',
            },

            '@media (min-width: 768px) and (max-width: 991px)': {
              width: '100%',
              maxWidth: '100%',
              padding: '30px',
            },

            '@media (max-width: 768px) and (min-width: 570px)': {
              width: '100%',
              maxWidth: '100%',
              padding: '40px 30px',
            },

            '@media (max-width: 570px)': {
              padding: '30px 20px',
            },
          },
        },
        {
          props: { variant: 'public' },
          style: {
            maxWidth: '1600px !important',
            margin: '70px auto',

            '@media screen and (min-width: 1600px)': {
              padding: '0',
            },

            '@media screen and (max-width: 1600px) and (min-width: 1200px)': {
              paddingLeft: '70px',
              paddingRight: '70px',
            },

            '@media screen and (max-width: 1200px) and (min-width: 991px)': {
              paddingLeft: '50px',
              paddingRight: '50px',
            },

            '@media screen and (max-width: 991px) and (min-width: 768px)': {
              paddingLeft: '30px',
              paddingRight: '30px',
            },

            '@media screen and (max-width: 768px)': {
              paddingLeft: '20px',
              paddingRight: '20px',
              margin: '30px auto',
            },
          },
        },
      ],
    },
  },

  palette: {
    primary: {
      main: '#422438',
    },

    basicWhite: {
      main: '#FFF6EC',
    },

    lightYellow: {
      main: '#ffe3c5',
    },

    darkYellow: {
      main: '#EDB42F',
    },

    yellow: {
      main: '#FAC751',
    },

    lightOrange: {
      main: '#FEA87E',
    },

    lightPink: {
      main: '#FFF6EC',
    },

    darkPink: {
      main: '#F1416C',
    },

    paleOrange: {
      main: '#FFF2D0',
    },

    darkPurple: {
      main: '#422438',
      textContrast: '#FFF2D0',
    },

    parrot: {
      main: '#50CD89',
    },

    grey: {
      main: '#e3dee1',
      dark: '#A0919B',
      light: '#ece9eb',
    },

    lightGrey: {
      main: '#E3D6D1',
    },

    red: {
      main: '#A23842',
      dark: '#F15642',
    },

    brown: {
      main: '#6A2837',
    },

    darkBlue: {
      main: '#011F42',
    },

    lightBlue: {
      main: '#B3DDF0',
    },

    darkPaleOrange: {
      main: '#F8D19E',
    },

    success: {
      main: '#32C850',
    },

    border: {
      main: '#ECE9EB',
    },

    black: {
      main: '#000000',
      contrast: '#3F4254',
      greyishBlack: '#212121',
    },

    hover: {
      main: '#fff1e2',
    },
  },
});

export default customTheme;
