import React from 'react';
import { Box, Drawer } from '@mui/material';

function Arena({ drawerOpen, setDrawerOpen }) {
  const txt = 'hello world';
  sessionStorage.setItem('my-key', txt);
  console.log(sessionStorage.getItem('my-key'));

  return (
    <Box>
      <Drawer id="arena" hideBackdrop anchor="bottom" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        hiii
      </Drawer>
    </Box>
  );
}

export default Arena;
