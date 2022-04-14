import React from 'react';
import { graphql } from 'gatsby';
import {
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { Link, ListItemButton } from 'gatsby-theme-material-ui';
import { visuallyHidden } from '@mui/utils';
import { Feed, LocationOn, EmojiPeople } from '@mui/icons-material/';
import Layout from './layout';
import AdventureDetails from './adventure-details';
import {
  NPCS, HEADER_CELLS, LOCATIONS,
} from '../utils/constants';

function AdventurePageLayout({ data }) {
  return (
    <Layout title={data.mdx.frontmatter.title}>
      <Box>
        <Paper
          sx={{
            p: 2,
            display: 'grid',
            gridTemplate: 'repeat(2, auto) / repeat(2, 1fr)',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          <Card raised>
            <AdventureDetails
              body={data.mdx.body}
              levels={data.mdx.frontmatter.levels}
              players={data.mdx.frontmatter.playernum}
              setting={data.mdx.frontmatter.setting}
              direction="column-reverse"
            />
          </Card>
          <Card raised>
            <Typography
              variant="h4"
              componen="h3"
              sx={{
                px: 1,
              }}
            >
              <LocationOn />
              {LOCATIONS}
            </Typography>
            <Divider />
            <Locations
              content={data.locations.nodes}
              parentAdventureSlug={data.mdx.slug}
              parentAdventureTitle={data.mdx.frontmatter.title}
            />
          </Card>
          <Card
            raised
            sx={{
              gridColumn: '1 / 3',
              gridRow: '2 / 3',
            }}
          >
            <Typography
              variant="h4"
              componen="h3"
              sx={{
                px: 1,
              }}
            >
              <EmojiPeople />
              {NPCS}
            </Typography>
            <Divider />
            <Npcs content={data.npcs.nodes} />
          </Card>
        </Paper>
      </Box>
    </Layout>
  );
}

function Locations({ content, parentAdventureSlug, parentAdventureTitle }) {
  return (
    <Box>
      <List>
        {content.map((location) => (
          <LocationItem
            content={location}
            key={location.slug}
            parentAdventureSlug={parentAdventureSlug}
            parentAdventureTitle={parentAdventureTitle}
          />
        ))}
      </List>
    </Box>
  );
}

function LocationItem({ content, parentAdventureSlug, parentAdventureTitle }) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        state={{
          parentAdventureSlug,
          parentAdventureTitle,
        }}
        to={`/${content.slug}`}
      >
        <ListItemText
          primary={content.frontmatter.title}
          sx={{
            color: 'primary.light',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

function Npcs({ content }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = content.map((row) => row.frontmatter);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a, b) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = () => (
    order === 'desc'
      ? (a, b) => descendingComparator(a, b)
      : (a, b) => -descendingComparator(a, b)
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableContainer>
      <Table>
        <NpcTableHead
          headers={HEADER_CELLS}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <NpcTableBody
          page={page}
          order={order}
          orderBy={orderBy}
          emptyRows={emptyRows}
          rows={rows}
          rowsPerPage={rowsPerPage}
          getComparator={getComparator}
        />
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

function NpcTableHead({
  headers,
  order,
  orderBy,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headers.map((cell) => (
          <NpcTableHeadCell
            cell={cell}
            createSortHandler={createSortHandler}
            key={cell.label}
            order={order}
            orderBy={orderBy}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}

function NpcTableHeadCell({
  cell,
  createSortHandler,
  order,
  orderBy,
}) {
  return (
    <TableCell
      key={cell.id}
      align={cell.numeric ? 'right' : 'left'}
      sortDirection={orderBy === cell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === cell.id}
        direction={orderBy === cell.id ? order : 'asc'}
        onClick={createSortHandler(cell.id)}
      >
        {cell.label}
        {orderBy === cell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}

function NpcTableBody({
  page,
  order,
  orderBy,
  emptyRows,
  rows,
  rowsPerPage,
  getComparator,
}) {
  return (
    <TableBody>
      {rows.slice().sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow
            hover
            key={row.name}
            tabIndex={-1}
          >
            {[
              row.name,
              row.race,
              row.location,
              row.occupation,
              row.age,
              row.stats,
              row.emotion,
              row.motive,
              row.voice,
            ].map((cell) => {
              if (cell === row.stats) {
                return (
                  <TableCell align="left" key={Math.random()}>
                    <Link
                      to="/search/?category=monsters"
                      state={{
                        query: cell,
                      }}
                    >
                      <Feed
                        sx={{
                          color: 'common.white',
                        }}
                      />
                    </Link>
                  </TableCell>
                );
              }
              return (
                <TableCell
                  key={Math.random()}
                  align={cell === row.age ? 'right' : 'left'}
                >
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 75 * emptyRows,
          }}
        >
          <TableCell colSpan={9} />
        </TableRow>
      )}
    </TableBody>
  );
}

export const query = graphql`
  query AdventurePageQuery($id: String, $locations: String, $npcs: String) {
    mdx(id: {eq: $id}) {
      id
      body
      frontmatter {
        title
        levels
        playernum
        setting
      }
      slug
    }
    locations: allMdx(
      filter: {slug: {regex: $locations}}
      sort: {fields: frontmatter___title}
    ) {
      nodes {
        frontmatter {
          title
        }
        slug
      }
    }
    npcs: allMdx(
      filter: {slug: {regex: $npcs}}
      sort: {fields: frontmatter___name}
    ) {
      nodes {
        id
        body
        frontmatter {
          name
          race
          location
          occupation
          age
          emotion
          stats
          motive
          voice
        }
        slug
      }
    }
  }
`;

export default AdventurePageLayout;
