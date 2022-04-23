/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Navigation from '../components/navigation';
import Layout from '../components/layout';
import { GREETING, DESCRIPTION } from '../utils/constants';

function IndexPage() {
  return (
    <Layout title="Home" hideNavigation>
      <Box>
        <Paper
          sx={{
            color: 'secondary.main',
            display: 'grid',
            gridTemplate: 'auto / 3fr 1fr',
            gap: 2,
            p: 2,
            mt: 1,
            '.gmcm-Card-root:not(:first-of-type)': {
              gridColumn: '1 / 3',
            },
          }}
        >
          <Card raised>
            <CardContent>
              <Typography variant="h2">{GREETING}</Typography>
              <Typography>{DESCRIPTION}</Typography>
              <Box
                sx={{
                  mt: 4,
                  '& li': {
                    pl: 0,
                    pb: 0,
                  },
                  '& a': {
                    color: 'secondary.main',
                  },
                }}
              >
                <Typography variant="h6" component="h3">External Links</Typography>
                <List disablePadding>
                  <ListItem>
                    <a target="_blank" href="https://github.com/game-master-campaign-manager/gatsby-theme-gmcm" rel="noreferrer noopener">GMCM Plugin HitHub Repository</a>
                  </ListItem>
                  <ListItem>
                    <a target="_blank" href="https://github.com/game-master-campaign-manager/gatsby-theme-gmcm/wiki" rel="noreferrer noopener">GMCM Documentation</a>
                  </ListItem>
                  <ListItem>
                    <a target="_blank" href="https://game-master-campaign-manager.github.io/" rel="noreferrer noopener">GMCM Demo Site</a>
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>
          <Navigation homeNav size="large" hideDrawerIcon />
          <Card raised>
            <CardHeader title="What's New" subheader="v0.1.2" />
            <CardContent>
              <List disablePadding>
                <ListItem>* Added the Combat Tracker to search pages. You can now add players and monsters to a simple combat simulator that automatically determines the Initiative/HP of monsters added. See plugin documentation for more information.</ListItem>
                <ListItem>* Added OGL, SRD documents in a new "Legal" page in the footer.</ListItem>
                <ListItem>* Added all SRD monsters to the monster search.</ListItem>
              </List>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Layout>
  );
}

export default IndexPage;
