import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  Alert,
  Box,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  SvgIcon,
  Tooltip,
} from '@mui/material';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import {
  Link,
  Button,
  ListItemButton,
  CardActionArea,
} from 'gatsby-theme-material-ui';
import MarkdownView from 'react-showdown';
import {
  ArrowBack,
  ArrowDownward,
  ArrowUpward,
  Info,
  Map,
} from '@mui/icons-material/';
import Layout from './layout';
import { MonsterLink, SpellLink } from './custom-link';
import Dice from './dice';
import {
  MAP, GENERAL, UP, DOWN,
  CARD_HEADER_STYLES, SCROLL_BEHAVIOR, UNKNOWN_FLAG, FLAG_TOOLTIPS,
} from '../utils/constants';
import {
  Read,
  TreasureChest,
  Person,
  Minion,
  SecretDoor,
  Eyes,
  Trap,
  Boss,
  Unknown,
} from '../images/icons';

const markdownComponentsList = {
  Link, MonsterLink, SpellLink, Dice,
};

function LocationPageLayout({ data, location }) {
  const [scrollLocation, setScrollLocation] = useState(0);

  const parentAdventureTitle = location.state ? location.state.parentAdventureTitle : '';
  const parentAdventureSlug = location.state ? location.state.parentAdventureSlug : '';
  return (
    <Layout title={data.mdx.frontmatter.title}>
      {parentAdventureTitle && (
        <Link
          sx={{
            typography: 'Body1',
            color: 'primary.light',
          }}
          to={`/${parentAdventureSlug}`}
        >
          <ArrowBack
            fontSize="inherit"
            sx={{
              position: 'relative',
              top: 3,
            }}
          />
          {parentAdventureTitle}
        </Link>
      )}
      <Box
        sx={{
          display: 'inline-block',
          position: 'sticky',
          left: '100%',
          top: '1rem',
          zIndex: 'snackbar',
          mb: 2,
        }}
      >
        <LocationNavigation
          locationMax={data.mdx.frontmatter.areas.length}
          scrollLocation={scrollLocation}
          setScrollLocation={setScrollLocation}
        />
      </Box>
      <Box>
        <Paper
          sx={{
            overflow: 'hidden',
          }}
        >
          <LocationMap
            image={getImage(data.mdx.frontmatter.map.image)}
            map={data.mdx.frontmatter.map}
            title={data.mdx.frontmatter.title}
            areas={data.mdx.frontmatter.areas}
            setScrollLocation={setScrollLocation}
          />
          <GeneralFeatures content={data.mdx.body} />
          <LocationAreaList content={data.mdx.frontmatter.areas} />
        </Paper>
      </Box>
    </Layout>
  );
}

function LocationNavigation({
  locationMax,
  scrollLocation,
  setScrollLocation,
}) {
  const navData = [
    {
      name: MAP,
      anchor: 'map',
      icon: <Map />,
    },
    {
      name: GENERAL,
      anchor: 'general',
      icon: <Info />,
    },
    {
      name: UP,
      anchor: 'up',
      icon: <ArrowUpward />,
    },
    {
      name: DOWN,
      anchor: 'down',
      icon: <ArrowDownward />,
    },
  ];

  const handleClick = (event, anchorTarget, content) => {
    event.preventDefault();
    console.log(scrollLocation);
    let location = scrollLocation;
    if (content.anchor === 'up' || content.anchor === 'down') {
      if (content.anchor === 'up') {
        if (scrollLocation > 1) {
          location -= 1;
        }
        if (scrollLocation === 1) {
          location = 'general';
        }
        if (scrollLocation === 'general') {
          location = 'map';
        }
      }
      if (content.anchor === 'down') {
        if (scrollLocation === 'map') {
          location = 'general';
        }
        if (scrollLocation === 'general') {
          location = 1;
        }
        if (scrollLocation < locationMax) {
          location += 1;
        }
      }
      document.getElementById(location).scrollIntoView(SCROLL_BEHAVIOR);
      setScrollLocation(location);
    } else {
      anchorTarget.scrollIntoView(SCROLL_BEHAVIOR);
      setScrollLocation(anchorTarget.id);
    }
  };
  return (
    <ButtonGroup variant="contained">
      {navData.map((navItem) => (
        <LocationNavigationButton content={navItem} key={navItem.name} handleClick={handleClick} />
      ))}
    </ButtonGroup>
  );
}

function LocationNavigationButton({ content, handleClick }) {
  const [anchorTarget, setAnchorTarget] = useState(null);

  useEffect(() => {
    setAnchorTarget(document.getElementById(content.anchor));
  }, []);

  return (
    <Button
      to={`#${content.anchor}`}
      onClick={(event) => handleClick(event, anchorTarget, content)}
      aria-label="Navigation Button"
      title={content.name}
    >
      {content.icon}
    </Button>
  );
}

function LocationMap({
  areas, image, map, title, setScrollLocation,
}) {
  const overlayFrame = (map && map.image && map.width && map.height && map.padding)
    ? {
      // From Location file's frontmatter.
      padding: map.padding,
      display: 'grid',
      gridTemplateColumns: `repeat(${map.width}, 1fr)`,
      gridTemplateRows: `repeat(${map.height}, 1fr)`,
      // Positioning Area List over the Map Image.
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }
    : null;

  return (
    <Card
      id="map"
      raised
      sx={{
        m: 2,
      }}
    >
      <CardHeader
        avatar={<Map />}
        title={MAP}
        disableTypography
        sx={CARD_HEADER_STYLES}
      />
      <CardContent
        sx={{
          position: 'relative',
          p: 0,
          pb: '0 !important',
        }}
      >
        <GatsbyImage
          image={image}
          loading="eager"
          alt={`Map of ${title}`}
        />
        <List
          sx={overlayFrame}
        >
          {areas.map((area, index) => (
            <React.Fragment key={`${area.name}-${Math.random()}`}>
              <LocationMapArea
                content={area}
                index={index + 1}
                setScrollLocation={setScrollLocation}
              />
              {area.traps && area.traps.map((trap) => (
                <LocationMapTrap
                  content={trap}
                  key={`${area.name}-trap-${Math.random()}`}
                />
              ))}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function LocationMapTrap({ content }) {
  return (
    <ListItem
      dense
      disableGutters
      disablePadding
      sx={{
        gridColumnStart: content.x,
        gridRowStart: content.y,
        gridColumnEnd: content.x + content.w,
        gridRowEnd: content.y + content.h,
        border: '1vw solid',
        borderColor: 'error.main',
        boxShadow: 4,
      }}
    />
  );
}

function LocationMapArea({
  content, index, setScrollLocation,
}) {
  const handleClick = (event) => {
    event.preventDefault();
    document.getElementById(index).scrollIntoView(SCROLL_BEHAVIOR);
    setScrollLocation(parseInt(index, 10));
  };
  const flagIcons = {
    person: {
      icon: <Person />,
      title: FLAG_TOOLTIPS.person,
    },
    monster: {
      icon: <Minion />,
      title: FLAG_TOOLTIPS.monster,
    },
    secret: {
      icon: <SecretDoor />,
      title: FLAG_TOOLTIPS.secret,
    },
    eyes: {
      icon: <Eyes />,
      title: FLAG_TOOLTIPS.eyes,
    },
    treasure: {
      icon: <TreasureChest />,
      title: FLAG_TOOLTIPS.treasure,
    },
    trap: {
      icon: <Trap />,
      title: FLAG_TOOLTIPS.trap,
    },
    boss: {
      icon: <Boss />,
      title: FLAG_TOOLTIPS.boss,
    },
  };
  return (
    <ListItem
      dense
      disableGutters
      disablePadding
      sx={{
        gridColumnStart: content.x,
        gridRowStart: content.y,
        padding: 0,
        display: 'block',
        position: 'relative',
        '&:hover > .gmcm-Card-root': {
          display: 'block',
        },
      }}
    >
      <ListItemButton
        dense
        disableGutters
        onClick={handleClick}
        sx={{
          typography: 'caption',
          p: 0,
          display: 'flex',
          backgroundColor: 'primary.main',
          height: '100%',
          fontWeight: 500,
          boxShadow: 4,
          borderRadius: '4px',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {index}
      </ListItemButton>
      <Card
        raised
        sx={{
          position: 'absolute',
          display: 'none',
          zIndex: 1,
          top: '85%',
          left: '15%',
        }}
      >
        <CardActionArea
          onClick={handleClick}
        >
          <CardHeader title={content.name} />
          <CardContent>
            {content.flags && (
              <Stack direction="row">
                {content.flags.map((flag) => (
                  <Tooltip
                    key={flagIcons[flag] ? flagIcons[flag].title : Math.random()}
                    title={flagIcons[flag] ? flagIcons[flag].title : UNKNOWN_FLAG}
                  >
                    <SvgIcon
                      color="secondary"
                      viewBox="0 0 24 24"
                      sx={{
                        mx: 0.5,
                      }}
                    >
                      {flagIcons[flag] ? flagIcons[flag].icon : <Unknown />}
                    </SvgIcon>
                  </Tooltip>
                ))}
              </Stack>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
}

function GeneralFeatures({ content }) {
  return (
    <Card
      raised
      id="general"
      sx={{
        m: 2,
      }}
    >
      <CardHeader
        avatar={<Info />}
        title={GENERAL}
        disableTypography
        sx={CARD_HEADER_STYLES}
      />
      <Divider />
      <CardContent>
        <MDXRenderer>{content}</MDXRenderer>
      </CardContent>
    </Card>
  );
}

function LocationAreaList({ content }) {
  return (
    <List component={Stack}>
      {content.map((area, index) => (
        <LocationAreaListItem
          content={area}
          index={index + 1}
          key={`${area.name}-${Math.random()}`}
        />
      ))}
    </List>
  );
}

function LocationAreaListItem({ content, index }) {
  return (
    <ListItem
      id={index}
      sx={{
        display: 'block',
      }}
    >
      <Card raised>
        <CardHeader title={`${index}. ${content.name}`} />
        <Divider />
        <CardContent>
          {content.callout && (
            <LocationAreaListItemAlert
              content={content.callout}
              icon={<Read width="24" />}
              severity="warning"
            />
          )}
          {content.flavor && (
            <LocationAreaListItemAlert
              content={content.flavor}
              icon={<TreasureChest width="24" />}
              severity="info"
            />
          )}
          {content.content && (
            <MarkdownView
              markdown={content.content}
              components={markdownComponentsList}
            />
          )}
        </CardContent>
      </Card>
    </ListItem>
  );
}

function LocationAreaListItemAlert({ content, icon, severity }) {
  return (
    <Alert
      severity={severity}
      icon={(
        <SvgIcon
          sx={{
            mt: 1.5,
          }}
        >
          {icon}
        </SvgIcon>
      )}
      sx={{
        '&:not(:first-of-type)': {
          mt: 1,
        },
      }}
    >
      <MarkdownView markdown={content} />
    </Alert>
  );
}

export const query = graphql`
query ($id: String, $pid: String) {
  mdx(id: {eq: $id}) {
    id
    body
    slug
    frontmatter {
      title
      areas {
        flavor
        callout
        content
        name
        x
        y
        flags
        traps {
          x
          y
          h
          w
        }
      }
      map {
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
        width
        height
        padding
      }
    }
  }
  adventure: mdx(id: {eq: $pid}) {
    slug
    frontmatter {
      title
    }
  }
}
`;

export default LocationPageLayout;
