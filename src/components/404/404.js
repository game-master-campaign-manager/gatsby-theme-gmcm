import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Layout from '../Layout/Layout';

function FourOhFour({ data }) {
  return (
    <Layout title={data.title}>
      <Box>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Image image={data.image} />
          <Divider sx={{ my: 2 }} />
          {data.text.map((t) => (
            <Typography key={t}>{t}</Typography>
          ))}
        </Paper>
      </Box>
    </Layout>
  );
}

function Image({ image }) {
  return <StaticImage src="../../images/404.png" alt={image} />;
}

export default FourOhFour;
