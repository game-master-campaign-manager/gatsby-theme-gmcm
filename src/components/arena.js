import React from 'react';
import {
  Box, Drawer, FormControl, Input, InputLabel, List, ListItem, SvgIcon, TextField,
} from '@mui/material';
import { IconButton } from 'gatsby-theme-material-ui';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CasinoIcon from '@mui/icons-material/Casino';

function useArena() {
  // Drawer State.
  const [arenaDrawerOpen, setArenaDrawerOpen] = React.useState(false);
  // Parsed Session Storage data.
  const [arenaSessionStorage, setArenaSessionStorage] = React.useState(
    JSON.parse(sessionStorage.getItem('gmcm-combatants') || '[]'),
  );
  const [playerName, setPlayerName] = React.useState('');
  const [error, setError] = React.useState(false);
  // Mapping ListItems based on parsed Session Storage data
  const combatantListItems = arenaSessionStorage
    .sort((a, b) => (a.initiative < b.initiative ? 1 : -1))
    .map((item) => {
      const initiative = item.initiative || 0;
      console.log(initiative);
      return (
        <ListItem key={`${item.name}-${Math.random()}`}>
          <IconButton sx={{ textAlign: 'center' }}>
            {initiative === 0 ? (
              <SvgIcon>
                <CasinoIcon />
              </SvgIcon>
            ) : initiative}
          </IconButton>
          {item.name}
          <TextField
            variant="standard"
            error={error && playerName === ''}
            value={item.hp || 0}
            sx={{
              width: '2rem',
              '& input': {
                textAlign: 'center',
                fontFamily: 'monospace',
              },
            }}
            onChange={() => {
              // setError(false);
              // setPlayerName(event.target.value);
            }}
          />
        </ListItem>
      );
    });
  // Set Stringified Session Storage data.
  React.useEffect(() => {
    sessionStorage.setItem('gmcm-combatants', JSON.stringify(arenaSessionStorage));
  }, [arenaSessionStorage]);

  return {
    arenaSessionStorage,
    setArenaSessionStorage,
    arenaDrawerOpen,
    setArenaDrawerOpen,
    arenaRender: (
      <Drawer
        anchor="right"
        open={arenaDrawerOpen}
        onClose={() => setArenaDrawerOpen(false)}
        sx={{
          p: '1rem',
        }}
      >
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            if (playerName === '') {
              setError(true);
              return;
            }
            setArenaSessionStorage([...arenaSessionStorage, { name: playerName, initiative: 0 }]);
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
