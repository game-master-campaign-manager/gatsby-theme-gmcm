/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  Box, Card, CardContent, Paper, Typography,
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
              <Typography variant="body1">{DESCRIPTION}</Typography>
            </CardContent>
          </Card>
          <Navigation homeNav size="large" />
          {/* <Card raised>
            <CardHeader
              title="Adventures"
              subheader="Where all the fun is at."
            />
            <Divider />
            <CardContent>
              <Typography>
                This is the whole reason we\'re here, right? What would our favorite TTRPG
                be without our our adventures?
              </Typography>
              <Typography>
                The GMCM allows you to group NPCs and Locations within individual
                campaigns, or \"adventures\".
              </Typography>
            </CardContent>
          </Card> */}
        </Paper>
      </Box>
    </Layout>
  );
}

export default IndexPage;
