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
import Navigation from '../navigation';
import Layout from '../layout';

function Index({ data }) {
  return (
    <Layout hideNavigation>
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
              <Typography variant="h2">{data.title}</Typography>
              <Typography>{data.text}</Typography>
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
                <Typography variant="h6" component="h3">{data.documentation.label}</Typography>
                <List disablePadding>
                  {data.documentation.links.map((link) => (
                    <ListItem key={link.url}>
                      <a target="_blank" href={link.url} rel="noreferrer noopener">{link.title}</a>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
          <Navigation homeNav size="large" hideDrawerIcon />
          <Card raised>
            <CardHeader title={data.news.label} subheader={`v${data.news.version}`} />
            <CardContent>
              <List disablePadding>
                {data.news.bullets.map((bullet) => (
                  <ListItem key={bullet}>{`* ${bullet}`}</ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Layout>
  );
}

export default Index;
