/* eslint-disable react/jsx-indent */
import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import {
  Box, Divider, Paper, Typography,
} from '@mui/material';
import Layout from '../components/layout';

function Image() {
  return <StaticImage src="../images/404.png" alt="Sword" />;
}

function FourOhFourPage() {
  return (
    <Layout title="404!">
      <Box>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Image />
          <Divider sx={{ my: 2 }} />
          <Typography>Your party has become lost in rough terrain.</Typography>
          <Typography>Turn back now.</Typography>
        </Paper>
      </Box>
    </Layout>
  );
}

export default FourOhFourPage;
