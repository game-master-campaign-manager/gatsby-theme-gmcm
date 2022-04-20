/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  Box, Card, CardContent, List, ListItem, Paper, Typography,
} from '@mui/material';
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
            gridTemplate: 'auto / repeat(2, auto)',
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
        </Paper>
      </Box>
    </Layout>
  );
}

export default IndexPage;
