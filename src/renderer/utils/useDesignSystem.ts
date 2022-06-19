import { useAtom } from 'jotai';
import { createTheme, darkScrollbar, PaletteMode, Theme, useMediaQuery } from '@mui/material';
import { atomPersistenceAppearance } from '../atoms/atomUI';

declare module '@mui/material/styles' {
  interface Palette {
    input: { default: string; hover: string };
    card: { default: string; hover: string };
  }
  interface PaletteOptions {
    input?: { default: string; hover: string };
    card?: { default: string; hover: string };
  }
}

const createDesignTokens = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#007fff' : '#007fff',
        dark: mode === 'dark' ? '#0059b2' : '#0059b2',
      },
      text: {
        primary: mode === 'dark' ? '#EBEBEB' : '#424242',
        secondary: mode === 'dark' ? '#BABBBA' : '#636363',
        disabled: mode === 'dark' ? '#747474' : '#A7A7A7',
      },
      background: {
        default: mode === 'dark' ? '#282828' : 'rgba(0,0,0,0)',
      },
      input: {
        default: mode === 'dark' ? '#282828' : '#F5F5F5',
        hover: mode === 'dark' ? '#3A3A3A' : '#F0F0F0',
      },
      card: {
        default: mode === 'dark' ? '#282828' : '#F5F5F5',
        hover: mode === 'dark' ? '#3A3A3A' : '#F0F0F0',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: [
        'Barlow',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  };
};

const createOverrideCompnents = (mode: PaletteMode) => {
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: mode === 'dark' ? darkScrollbar() : null,
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            userSelect: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 0,
            justifyContent: 'space-between',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            cursor: 'default',
          },
        },
      },
      MuiIcon: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            cursor: 'default',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            cursor: 'default',
          },
        },
      },
    },
  };
};

const useDesignSystem = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [appearance] = useAtom(atomPersistenceAppearance);

  let designSystem: Theme;

  if (appearance === 'system') {
    if (prefersDarkMode) {
      designSystem = createTheme(createDesignTokens('dark'), createOverrideCompnents('dark'));
    } else {
      designSystem = createTheme(createDesignTokens('light'), createOverrideCompnents('light'));
    }
  } else {
    designSystem = createTheme(createDesignTokens(appearance), createOverrideCompnents(appearance));
  }

  return { designSystem };
};

export default useDesignSystem;
