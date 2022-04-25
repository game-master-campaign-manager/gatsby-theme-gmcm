import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Layout from './layout';

function FourOhFour({ data }) {
  const content = data.file.childMdx;
  return (
    <Layout title={content.frontmatter.title}>
      <Box>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Image image={content.frontmatter.image} />

          <Divider sx={{ my: 2 }} />
          {content.frontmatter.textLines.map((t) => (
            <Typography key={t}>{t}</Typography>
          ))}
        </Paper>
      </Box>
    </Layout>
  );
}

function Image() {
  return <StaticImage src="../images/404.png" alt="Sword" />;
}

export default FourOhFour;
