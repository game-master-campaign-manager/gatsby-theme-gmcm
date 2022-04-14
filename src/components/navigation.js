import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import { NAVIGATION_DATA } from '../utils/constants';

function Navigation({
  homeNav, hideNavigation, variant, size,
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
          display: !homeNav && 'flex',
          justifyContent: !homeNav && 'flex-end',
        }}
      >
        {NAVIGATION_DATA.map((item) => (
          <ListItem
            disablePadding
            key={item.title}
            sx={{
              '& + &': {
                mt: homeNav ? 2 : 0,
                ml: homeNav ? 0 : 2,
              },
              width: homeNav ? '100%' : 'auto',
            }}
          >
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
