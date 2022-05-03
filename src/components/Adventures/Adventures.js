import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import { CardActionArea } from 'gatsby-theme-material-ui';
import Layout from '../Layout/Layout';
import AdventureDetails from '../AdventureDetails/AdventureDetails';

function Adventures({ page, adventures }) {
  const { title } = page;
  return (
    <Layout title={title} hideDrawerIcon>
      <AdventuresList content={adventures.nodes} />
    </Layout>
  );
}

function AdventuresList({ content }) {
  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {content.map((adventure) => (
          <Adventure key={adventure.childMdx.id} content={adventure} />
        ))}
      </Paper>
    </Box>
  );
}

function Adventure({ content }) {
  console.log(content.childMdx.slug);
  return (
    <Card
      raised
      component="article"
      sx={{
        flex: '0 0 calc(50% - 8px)',
      }}
    >
      <CardActionArea
        to={`/${content.childMdx.slug}`}
        sx={{
          height: '100%',
        }}
      >
        <CardHeader
          title={content.childMdx.frontmatter.title}
          sx={{
            color: 'white',
            backgroundColor: 'primary.main',
          }}
        />
        <AdventureDetails
          body={content.childMdx.body}
          levels={content.childMdx.frontmatter.levels}
          players={content.childMdx.frontmatter.playernum}
          setting={content.childMdx.frontmatter.setting}
        />
      </CardActionArea>
    </Card>
  );
}

export default Adventures;
