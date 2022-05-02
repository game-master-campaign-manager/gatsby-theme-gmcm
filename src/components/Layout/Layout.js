import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Link } from 'gatsby-theme-material-ui';
import { Helmet } from 'react-helmet';
import { SnackbarProvider } from 'notistack';
import Navigation from '../Navigation/Navigation';
import GmcmBlackBridgeIcon from '../../images/black-bridge.svg';
import layoutStrings from './layoutStrings';

// eslint-disable-next-line react/function-component-definition
const HeaderContainer = (props) => <Container component="header" {...props} />;

function Layout({
  children, hideNavigation, title = undefined, navDirection, arenaRender = undefined,
}) {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          shortTitle
        }
      }
    }
  `);
  return (
    <>
      <Helmet defaultTitle={data.site.siteMetadata.shortTitle} title={title ? `${title} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title} />
      <Stack
        sx={{
          typography: 'body1',
          color: 'secondary.main',
          // Add universal styles here.
          // <code/> styles
          '& code': {
            backgroundColor: 'background.paper',
            padding: 0.5,
          },
          // Table header row styles
          '& thead tr': {
            backgroundColor: 'primary.main',
          },
          // for <SnackbarProvider />
          '& .SnackbarContainer-root': {
            gap: 2,
            // Some weird bug w/ notistack that puts "pointer-events" to "none".
            pointerEvents: 'all !important',
          },
        }}
      >
        <AppBar
          component={HeaderContainer}
          sx={{ backgroundColor: 'primary.main', minHeight: '4.25rem', position: 'static' }}
        >
          <Box sx={{
            backgroundColor: 'secondary.main', boxShadow: 2, position: 'absolute', zIndex: 'appBar',
          }}
          >
            <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
              <Link
                underline="none"
                to="/"
                sx={{
                  lineHeight: 1, color: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.25rem 0.5rem 0.5rem',
                }}
              >
                {data.site.siteMetadata.shortTitle}
                <SvgIcon sx={{ paddingTop: '0.5rem', fontSize: '4rem' }}>
                  <GmcmBlackBridgeIcon />
                </SvgIcon>
              </Link>
            </Typography>
          </Box>
          <Navigation hideNavigation={hideNavigation} navDirection={navDirection} />
        </AppBar>
        <Container component="main" sx={{ marginTop: '3rem', position: 'relative' }}>
          {arenaRender}
          <SnackbarProvider maxSnack={5}>
            {title && title !== 'Home' && (
              <Typography variant="h2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>{title}</Typography>
            )}
            {children}
          </SnackbarProvider>
        </Container>
        <Container component="footer" sx={{ mt: 4, mb: 2 }}>
          {`${data.site.siteMetadata.title} © ${new Date().getFullYear()} `}
          <Link color="primary.main" href={layoutStrings.author.url} target="_blank" rel="noreferrer noopener">{layoutStrings.author.name}</Link>
          {', '}
          <Link to="/legal">{layoutStrings.legal}</Link>
        </Container>
      </Stack>
    </>
  );
}

export default Layout;
