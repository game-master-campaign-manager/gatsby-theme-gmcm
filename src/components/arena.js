import React from 'react';
import {
  Box, Drawer, FormControl, Input, InputLabel, List, ListItem, ListItemText, SvgIcon, TextField,
} from '@mui/material';
import { IconButton } from 'gatsby-theme-material-ui';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CasinoIcon from '@mui/icons-material/Casino';

function useArena() {
  // Prep Session Storage data:
  const ssKey = 'gmcm-combatants';
  const parsedSessionData = JSON.parse(sessionStorage.getItem(ssKey) || '[]');
  if (parsedSessionData.length > 0) {
    parsedSessionData.sort((a, b) => (a.initiative < b.initiative ? 1 : -1));
    sessionStorage.setItem(ssKey, JSON.stringify(parsedSessionData));
  }
  // PARSED data:
  const [arenaSessionStorage, setArenaSessionStorage] = React.useState(parsedSessionData);

  // Drawer State:
  const [arenaDrawerOpen, setArenaDrawerOpen] = React.useState(false);

  // For manual entry, Player Name:
  const [playerName, setPlayerName] = React.useState('');

  // Create ListItems
  const [combatantListItems, setCombatantListItems] = React.useState([]);
  // Submit new initiative by making a shallow copy of data, manipulating it, and then
  // submiting the new data.
  const initiativeSubmit = (value, index) => {
    const arenaCopy = [...arenaSessionStorage];
    const arenaCopyItem = { ...arenaCopy[index] };
    arenaCopyItem.initiative = parseInt(value.replace(/\D/g, ''), 10);
    arenaCopy[index] = arenaCopyItem;
    setArenaSessionStorage(arenaCopy);
  };
  const combatantListMaker = (array) => array
    // Sort by initiative and then by name.
    .sort(
      (a, b) => (
        (a.initiative < b.initiative) ? 1 : (a.initiative === b.initiative) ? (
          (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1
        ) : -1
      ),
    )
    .map((item, index) => (
      <ListItem key={`${item.name}-${Math.random()}`}>
        {/* Initiative value */}
        <TextField
          variant="standard"
          defaultValue={item.initiative}
          onBlur={(event) => initiativeSubmit(event.target.value, index)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.target.blur();
            }
          }}
        />
        {/* Combatant's name */}
        <ListItemText primary={item.name} />
        {/* HP value */}
        <TextField
          variant="standard"
          defaultValue={item.hp || 0}
        />
      </ListItem>
    ));

  // IF arenaSessionStorage value is altered, reset the Session Storage data:
  React.useEffect(() => {
    console.log('arenaSessionStorage useEffect');
    // Resort the data and recreate the list.
    setCombatantListItems(combatantListMaker(arenaSessionStorage));
    // Stringify and resend the data to Session Storage.
    sessionStorage.setItem(ssKey, JSON.stringify(arenaSessionStorage));
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
        <List>{combatantListItems}</List>
      </Drawer>
    ),
  };
}

{ /* function useArena() {
  // Drawer State.
  // const [arenaDrawerOpen, setArenaDrawerOpen] = React.useState(false);
  // Parsed Session Storage data.
  // const [arenaSessionStorage, setArenaSessionStorage] = React.useState(
  //   JSON.parse(sessionStorage.getItem('gmcm-combatants') || '[]'),
  // );
  // const [playerName, setPlayerName] = React.useState('');
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
  // React.useEffect(() => {
  //   sessionStorage.setItem('gmcm-combatants', JSON.stringify(arenaSessionStorage));
  // }, [arenaSessionStorage]);

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
} */ }

export default useArena;
