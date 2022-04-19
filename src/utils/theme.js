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
      main: brown[200],
    },
  },
});

export default theme;
