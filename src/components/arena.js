import React from 'react';
import {
  Box, Drawer, FormControl, Input, InputLabel, List, ListItem,
} from '@mui/material';
import { IconButton } from 'gatsby-theme-material-ui';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function useArena() {
  // Drawer State.
  const [arenaDrawerOpen, setArenaDrawerOpen] = React.useState(false);
  // Parsed Session Storage data.
  const [arenaSessionStorage, setArenaSessionStorage] = React.useState(
    JSON.parse(sessionStorage.getItem('gmcm-combatants') || '[]'),
  );
  // Mapping ListItems based on parsed Session Storage data
  const combatantListItems = arenaSessionStorage.map((item) => (
    <ListItem key={`${item.name}-${Math.random()}`}>{item.name}</ListItem>
  ));
  // Set Stringified Session Storage data.
  React.useEffect(() => {
    sessionStorage.setItem('gmcm-combatants', JSON.stringify(arenaSessionStorage));
  }, [arenaSessionStorage]);

  const [playerName, setPlayerName] = React.useState('');
  const [error, setError] = React.useState(false);

  return {
    arenaSessionStorage,
    setArenaSessionStorage,
    arenaDrawerOpen,
    setArenaDrawerOpen,
    arenaRender: (
      <Drawer anchor="right" open={arenaDrawerOpen} onClose={() => setArenaDrawerOpen(false)}>
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            if (playerName === '') {
              setError(true);
              return;
            }
            setArenaSessionStorage([...arenaSessionStorage, { name: playerName }]);
            setPlayerName('');
          }}
        >
          <FormControl>
            <InputLabel htmlFor="add-player">Add to Combat Tracker</InputLabel>
            <Input
              error={error && playerName === ''}
              id="add-player"
              value={playerName}
              onChange={(event) => {
                setError(false);
                setPlayerName(event.target.value);
              }}
            />
          </FormControl>
          <IconButton color="primary" arial-label="Add a character to the combat tracker" type="submit">
            <PersonAddIcon />
          </IconButton>
        </Box>
        <List>{combatantListItems}</List>
      </Drawer>
    ),
  };
}

export default useArena;
