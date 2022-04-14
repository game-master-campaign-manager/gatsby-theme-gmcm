import React from 'react';
import { graphql } from 'gatsby';
import {
  Box, Card, CardHeader, Paper,
} from '@mui/material';
import { CardActionArea } from 'gatsby-theme-material-ui';
import Layout from '../components/layout';
import AdventureDetails from '../components/adventure-details';
import { ADVENTURES } from '../utils/constants';

function AdventuresPage({ data }) {
  return (
    <Layout title={ADVENTURES}>
      <Adventures content={data.allMdx.nodes} />
    </Layout>
  );
}

function Adventures({ content }) {
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
          <Adventure key={adventure.id} content={adventure} />
        ))}
      </Paper>
    </Box>
  );
}

function Adventure({ content }) {
  return (
    <Card
      raised
      component="article"
      sx={{
        flex: '0 0 calc(50% - 8px)',
      }}
    >
      <CardActionArea
        to={content.slug}
        sx={{
          height: '100%',
        }}
      >
        <CardHeader
          title={content.frontmatter.title}
          sx={{
            color: 'white',
            backgroundColor: 'primary.main',
          }}
        />
        <AdventureDetails
          body={content.body}
          levels={content.frontmatter.levels}
          players={content.frontmatter.playernum}
          setting={content.frontmatter.setting}
        />
      </CardActionArea>
    </Card>
  );
}

export const query = graphql`
  query AdventuresListPageQuery {
    allMdx(
      filter: {slug: {regex: "/adventures/.+/$/"}}
      sort: {fields: frontmatter___title}
    ) {
      nodes {
        body
        slug
        id
        frontmatter {
          title
          setting
          playernum
          levels
        }
      }
    }
  }
`;

export default AdventuresPage;
