import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import {
  Link, Button, ListItemButton, CardActionArea,
} from 'gatsby-theme-material-ui';
import MarkdownView from 'react-showdown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import Layout from '../Layout/Layout';
import { MonsterLink, SpellLink } from '../CustomLink/CustomLink';
import { Dice } from '../Dice/Dice';
import { SCROLL_BEHAVIOR } from '../../utils/constants';
import {
  Read, TreasureChest, Person, Minion, SecretDoor, Eyes, Trap, Boss, Unknown,
} from '../../images/icons';
import locationPageLayoutStrings from './locationPageLayoutStrings';

const cardHeaderStyles = { textTransform: 'capitalize', typography: 'h5' };

const markdownComponentsList = {
  Link, MonsterLink, SpellLink, Dice,
};

function LocationPageLayout({ data, location }) {
  const [scrollLocation, setScrollLocation] = useState(0);
  const parentAdventureTitle = location.state ? location.state.parentAdventureTitle : '';
  const parentAdventureSlug = location.state ? location.state.parentAdventureSlug : '';
  return (
    <Layout title={data.mdx.frontmatter.title} hideDrawerIcon>
      {parentAdventureTitle && (
        <Link sx={{ typography: 'Body1', color: 'primary.light' }} to={`/${parentAdventureSlug}`}>
          <ArrowBackIcon fontSize="inherit" sx={{ position: 'relative', top: 3 }} />
          {parentAdventureTitle}
        </Link>
      )}
      <Box sx={{
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
        <Paper sx={{ overflow: 'hidden' }}>
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

function LocationNavigation({ locationMax, scrollLocation, setScrollLocation }) {
  const navData = [
    {
      name: locationPageLayoutStrings.navigation.map,
      anchor: 'map',
      icon: <MapIcon />,
    },
    {
      name: locationPageLayoutStrings.navigation.general,
      anchor: 'general',
      icon: <InfoIcon />,
    },
    {
      name: locationPageLayoutStrings.navigation.directions.up,
      anchor: 'up',
      icon: <ArrowUpwardIcon />,
    },
    {
      name: locationPageLayoutStrings.navigation.directions.down,
      anchor: 'down',
      icon: <ArrowDownwardIcon />,
    },
  ];

  const handleClick = (event, anchorTarget, content) => {
    event.preventDefault();
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
    <Card id="map" raised sx={{ m: 2 }}>
      <CardHeader
        avatar={<MapIcon />}
        title={locationPageLayoutStrings.navigation.map}
        disableTypography
        sx={cardHeaderStyles}
      />
      <CardContent sx={{ position: 'relative', p: 0, pb: '0 !important' }}>
        <GatsbyImage image={image} loading="eager" alt={`Map of ${title}`} />
        <List sx={overlayFrame}>
          {areas.map((area, index) => (
            <React.Fragment key={`${area.name}-${Math.random()}`}>
              <LocationMapArea
                content={area}
                index={index + 1}
                setScrollLocation={setScrollLocation}
              />
              {area.traps && area.traps.map((trap) => (
                <LocationMapTrap content={trap} key={`${area.name}-trap-${Math.random()}`} />
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
      title: locationPageLayoutStrings.flags.person,
    },
    monster: {
      icon: <Minion />,
      title: locationPageLayoutStrings.flags.monster,
    },
    secret: {
      icon: <SecretDoor />,
      title: locationPageLayoutStrings.flags.secret,
    },
    eyes: {
      icon: <Eyes />,
      title: locationPageLayoutStrings.flags.eyes,
    },
    treasure: {
      icon: <TreasureChest />,
      title: locationPageLayoutStrings.flags.treasure,
    },
    trap: {
      icon: <Trap />,
      title: locationPageLayoutStrings.flags.trap,
    },
    boss: {
      icon: <Boss />,
      title: locationPageLayoutStrings.flags.boss,
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
                    title={
                      flagIcons[flag]
                        ? flagIcons[flag].title
                        : locationPageLayoutStrings.flags.unknown
                    }
                  >
                    <SvgIcon color="secondary" viewBox="0 0 24 24" sx={{ mx: 0.5 }}>
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
    <Card raised id="general" sx={{ m: 2 }}>
      <CardHeader
        avatar={<InfoIcon />}
        title={locationPageLayoutStrings.navigation.general}
        disableTypography
        sx={cardHeaderStyles}
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
        <LocationAreaListItem content={area} index={index + 1} key={`${area.name}-${Math.random()}`} />
      ))}
    </List>
  );
}

function LocationAreaListItem({ content, index }) {
  return (
    <ListItem id={index} sx={{ display: 'block' }}>
      <Card raised>
        <CardHeader title={`${index}. ${content.name}`} />
        <Divider />
        <CardContent>
          {content.callout && (
            <LocationAreaListItemAlert content={content.callout} icon={<Read width="24" />} severity="warning" />
          )}
          {content.flavor && (
            <LocationAreaListItemAlert content={content.flavor} icon={<TreasureChest width="24" />} severity="info" />
          )}
          {content.content && (
            <MarkdownView markdown={content.content} components={markdownComponentsList} />
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
        <SvgIcon sx={{ mt: 1.5 }}>{icon}</SvgIcon>
      )}
      sx={{ '&:not(:first-of-type)': { mt: 1 } }}
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
