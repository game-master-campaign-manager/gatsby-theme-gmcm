import { createTheme } from '@mui/material/styles';
import { brown, lime } from '@mui/material/colors';

const height = '100%';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: lime[900],
    },
    secondary: {
      main: brown[200],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '#gatsby-focus-wrapper': {
          height,
        },
        '#___gatsby': {
          height,
        },
        html: {
          height,
        },
        body: {
          height,
        },
      },
    },
  },
});

export default theme;
