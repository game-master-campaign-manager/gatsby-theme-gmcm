import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Link } from 'gatsby-theme-material-ui';
import MarkdownView from 'react-showdown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Masonry from '@mui/lab/Masonry';
import Layout from '../Layout/Layout';
import { Dice } from '../Dice/Dice';
import { SCROLL_BEHAVIOR } from '../../utils/constants';

/* Table of Contents */
function TableOfContents({ referenceData }) {
  return (
    <>
      <Box>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <List
            disablePadding
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
            }}
          >
            {referenceData.map((item) => (
              <TableOfContentsItem
                key={item.category}
                item={item}
              />
            ))}
          </List>
        </Paper>
      </Box>
      <Divider
        sx={{
          my: 4,
        }}
      />
    </>
  );
}

function TableOfContentsItem({ item }) {
  const plural = item.posts.length > 1 ? 's' : '';
  return (
    <ListItem
      disablePadding
      disableGutters
      sx={{
        width: 'auto',
        flex: '0 0 25%',
      }}
    >
      <Card
        raised
        sx={{
          height: '100%',
        }}
      >
        <CardHeader title={item.category} subheader={`${item.posts.length} Article${plural}`} />
        <Divider />
        <TableOfContentsItemList
          articles={item.posts}
        />
      </Card>
    </ListItem>
  );
}

function TableOfContentsItemList({ articles }) {
  return (
    <List>
      {articles.map((article) => (
        <TableOfContentsItemListLink
          key={article.post.childMdx.frontmatter.title}
          article={article}
        />
      ))}
    </List>
  );
}

function TableOfContentsItemListLink({ article: { post } }) {
  const [anchorTarget, setAnchorTarget] = React.useState(null);

  React.useEffect(() => {
    setAnchorTarget(
      document.getElementById(
        encodeURI(post.childMdx.frontmatter.title).toLowerCase(),
      ),
    );
  });

  const handleClick = (event) => {
    event.preventDefault();
    anchorTarget.scrollIntoView(SCROLL_BEHAVIOR);
  };

  return (
    <ListItem key={post.id}>
      <Link onClick={handleClick} to={`#${encodeURI(post.childMdx.frontmatter.title).toLowerCase()}`}>
        {post.childMdx.frontmatter.title}
      </Link>
    </ListItem>
  );
}

/* Reference Articles */
const componentsList = { Dice, List, ListItem };
function ReferenceArticles(props) {
  const { referenceData } = props;
  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <List disablePadding>
          {referenceData.map((item) => (
            <ReferenceArticlesCategoryBlock key={item.category} categoryBlock={item} />
          ))}
        </List>
      </Paper>
    </Box>
  );
}

function ReferenceArticlesCategoryBlock({ categoryBlock }) {
  return (
    <ListItem
      disablePadding
      disableGutters
      sx={{
        '& + &': {
          mt: 2,
        },
        display: 'block',
      }}
    >
      <Typography variant="h3">{categoryBlock.category}</Typography>
      <Box>
        <Masonry columns={2} spacing={2}>
          {categoryBlock.posts.map((item) => (
            <ReferenceArticlesCategoryBlockItem key={item.post.childMdx.id} item={item} />
          ))}
        </Masonry>
      </Box>
    </ListItem>
  );
}

function ReferenceArticlesCategoryBlockItem({ item: { post } }) {
  const { frontmatter } = post.childMdx;
  return (
    <Box id={encodeURI(frontmatter.title).toLowerCase()}>
      <Card raised>
        <CardHeader title={frontmatter.title} subheader={frontmatter.category} />
        <Divider />
        <CardContent>
          {frontmatter.content && frontmatter.content.map((piece) => {
            if (piece.type === 'dl') {
              return <ReferenceArticlesCategoryBlockItemDl key={Math.random()} content={piece} />;
            }
            if (piece.type === 'table') {
              return (
                <ReferenceArticlesCategoryBlockItemTable
                  key={piece.title}
                  content={piece}
                />
              );
            }
            if (piece.type === 'markdown') {
              return (
                <ReferenceArticlesCategoryBlockItemMarkdown
                  key={piece.title}
                  content={piece}
                />
              );
            }
            return null;
          })}
        </CardContent>
      </Card>
    </Box>
  );
}

function ReferenceArticlesCategoryBlockItemDl(props) {
  const { content } = props;
  return (
    <List>
      {content.terms.map((term) => (
        <ListItem key={term.dt} sx={{ display: 'block' }}>
          <Typography variant="h6" component="h4">{term.dt}</Typography>
          {term.dd.short && <Typography variant="subtitle1" component="p">{term.dd.short}</Typography>}
          {term.dd.cite && <Typography variant="subtitle2" component="p">{term.dd.cite}</Typography>}
          <Divider />
          {term.dd.text && (
            <MarkdownView
              markdown={term.dd.text}
              components={componentsList}
              options={{ tables: true }}
            />
          )}
        </ListItem>
      ))}
    </List>
  );
}
function ReferenceArticlesCategoryBlockItemTable({ content }) {
  return (
    <Box>
      <TableContainer>
        <Typography variant="h5" component="h3">{content.title}</Typography>
        <Table aria-label={content.title}>
          {content.headers && (
            <TableHead>
              <TableRow>
                {content.headers.map((header) => <TableCell key={header}>{header}</TableCell>)}
              </TableRow>
            </TableHead>
          )}
          {content.rows && (
            <TableBody>
              {content.rows.map((row) => (
                <TableRow key={Math.random()}>
                  {row.cells.length > 0 && row.cells.map((cell) => (
                    <TableCell
                      key={cell}
                      sx={{
                        p: 0.5,
                        verticalAlign: 'top',
                        '& ul': {
                          listStyle: 'none',
                          pl: 0,
                          wordBreak: 'break-word',
                        },
                        'li + li': {
                          mt: 2,
                        },
                      }}
                    >
                      <MarkdownView
                        components={componentsList}
                        markdown={cell}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
function ReferenceArticlesCategoryBlockItemMarkdown(props) {
  const { content } = props;
  return (
    <Box sx={{ typography: 'body1' }}>
      <MarkdownView
        key={content.text}
        components={componentsList}
        markdown={content.text}
      />
    </Box>
  );
}

/* PAGE FUNCTION */
function Reference({ page, references }) {
  const posts = references.nodes;

  const referenceData = [];
  if (posts.length) {
    // We want to create an array of objects. One object for each reference category that
    // contains all the reference posts for that category.
    // example:
    // {
    //  category: 'foo',
    //  posts: [array of post objects matching the category]
    // }
    //
    // For each post sent to the page by the graphql query,
    posts.forEach((post) => {
      // get the posts' category
      const { category } = post.childMdx.frontmatter;
      // then see if the referencesData array has an object for that category already.
      if (referenceData.filter((c) => c.category === category).length > 0) {
        // referencesData already has an object marked for this category's posts so push
        // this post to that category object's posts array:

        // Find the category object within referencesData that matches the category
        const obj = referenceData.find((categoryObject) => (categoryObject.category === category));
        // and push it to that object.
        obj.posts.push({ post });
      } else {
        // referencesData does NOT have an object marked for this category's posts so we'll
        // need to create one AND push the post to it.
        referenceData.push({
          category,
          posts: [{ post }],
        });
      }
    });
  }

  return (
    <Layout title={page.title} hideDrawerIcon>
      <Fab
        color="primary"
        aria-label="Scroll to top"
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 1,
        }}
        onClick={() => {
          window.scroll({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
      <TableOfContents
        referenceData={referenceData}
      />
      <ReferenceArticles referenceData={referenceData} />
    </Layout>
  );
}

export default Reference;
