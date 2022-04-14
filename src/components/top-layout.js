import * as React from 'react';
import { Helmet } from 'react-helmet';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme';

export default function TopLayout({ children }) {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        {/* CSS Reset */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
