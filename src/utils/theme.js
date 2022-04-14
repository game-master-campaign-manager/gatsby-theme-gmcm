import { createTheme } from '@mui/material/styles';
import { brown, lime } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: lime[900],
    },
    secondary: {
      // main: brown[900],
      main: brown[200],
    },
    // tertiary: {
    //   light: '#efdcd5',
    //   main: brown[200],
    //   dark: '#8c7b75',
    //   contrastText: '#000000',
    // },
  },
  // shape: {
  //   borderRadius: 0,
  // },
});
// theme.palette.background.default = theme.palette.secondary.main;

export default theme;
