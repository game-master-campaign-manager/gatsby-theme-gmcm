import React from 'react';
import {
  Box, List, ListItem,
} from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import { NAVIGATION_DATA } from '../utils/constants';

function Navigation({
  homeNav,
  hideNavigation,
  variant,
  size,
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
        {NAVIGATION_DATA.map((item) => (
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
        ))}
      </List>
    </Box>
  );
}

export default Navigation;
