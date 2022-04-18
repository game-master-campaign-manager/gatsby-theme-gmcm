import React from 'react';
import {
  Box, List, ListItem, SvgIcon,
} from '@mui/material';
import { Button, IconButton } from 'gatsby-theme-material-ui';
import { NAVIGATION_DATA } from '../utils/constants';
import SwordWoman from '../images/swordwoman.svg';

function Navigation({
  homeNav, hideNavigation, variant, size, drawerOpen, setDrawerOpen, hideDrawerIcon = false,
}) {
  return (
    <Box
      component="nav"
      sx={{
        display: hideNavigation && 'none',
        py: !homeNav && 2,
      }}
    >
      <List
        disablePadding
        sx={{
          display: 'flex',
          flexDirection: homeNav ? 'column' : 'row',
          justifyContent: !homeNav && 'flex-end',
          gap: 2,
        }}
      >
        {NAVIGATION_DATA.map((item, index) => {
          if (index === 0) {
            if (!hideDrawerIcon) {
              return (
                <ListItem key={item.title} disablePadding sx={{ width: 'auto' }}>
                  <IconButton
                    aria-label="Toggle the Combat Tracker"
                    size="small"
                    edge="end"
                    variant="contained"
                    onClick={() => {
                      setDrawerOpen(!drawerOpen);
                    }}
                  >
                    <SvgIcon>
                      <SwordWoman />
                    </SvgIcon>
                  </IconButton>
                </ListItem>
              );
            }
            return '';
          }
          return (
            <ListItem disablePadding key={item.title} sx={{ width: homeNav ? '100%' : 'auto' }}>
              <Button
                size={size || 'medium'}
                variant={variant || 'contained'}
                to={item.slug}
                color={homeNav ? 'primary' : 'secondary'}
                fullWidth
              >
                {item.title}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default Navigation;
