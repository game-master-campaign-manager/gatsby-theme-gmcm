import React from 'react';
import {
  Box, Drawer, List, ListItem, ListItemText, SvgIcon, TextField,
} from '@mui/material';
import { Button, IconButton } from 'gatsby-theme-material-ui';
import SkullIcon from '../images/icons/skull.svg';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

  // State for new player name validation.
  const [error, setError] = React.useState(false);
  // Skull input adornment.
  const deathAdornment = (
    <IconButton>
      <SvgIcon>
        <SkullIcon />
      </SvgIcon>
    </IconButton>
  );
  // Submit new initiative by making a shallow copy of data, manipulating it, and then
  // submiting the new data.
  const initiativeSubmit = (value, index) => {
    const arenaCopy = [...arenaSessionStorage];
    const arenaCopyItem = { ...arenaCopy[index] };
    arenaCopyItem.initiative = Number.isNaN(Number(parseInt(value, 10)))
      ? 0 : Number(parseInt(value, 10));
    arenaCopy[index] = arenaCopyItem;
    setArenaSessionStorage(arenaCopy);
  };
  // Submit new HP value like above.
  const hpSubmit = (value, current, index) => {
    const arenaCopy = [...arenaSessionStorage];
    const arenaCopyItem = { ...arenaCopy[index] };
    console.log(`${arenaCopyItem.name} ${value.includes('+') ? 'receives' : 'loses'} ${value} HP`);
    const hpSanitized = Number.isNaN(Number(parseInt(value, 10))) ? 0 : Number(parseInt(value, 10));
    const hpDigit = Number.isNaN(hpSanitized) ? 0 : hpSanitized;
    arenaCopyItem.hp = value.includes('+') ? (current + hpDigit) : (current - hpDigit);
    arenaCopy[index] = arenaCopyItem;
    setArenaSessionStorage(arenaCopy);
  };

  // Use this to check for duplicates.
  const duplicatesArray = [];
  const combatantListMaker = (array) => array
    // Sort by initiative and then by name.
    .sort(
      (a, b) => (
        (a.initiative < b.initiative) ? 1 : (a.initiative === b.initiative) ? (
          (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1
        ) : -1
      ),
    )
    .map((item, index) => {
      duplicatesArray.push(item.name);
      const dupes = (name) => {
        let count = 0;
        duplicatesArray.forEach((element, i) => {
          if (duplicatesArray[i] === name) {
            count += 1;
          }
        });
        return count;
      };
      return (
        <ListItem key={`${item.name}-${Math.random()}`}>
          {/* Initiative value */}
          <TextField
            variant="standard"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9.+-]*' }}
            defaultValue={item.initiative}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                initiativeSubmit(event.target.value, index);
              }
            }}
          />
          {/* Combatant's name */}
          <ListItemText primary={dupes(item.name) > 1 ? `${item.name} #${dupes(item.name)}` : item.name} />
          {/* HP value */}
          <TextField
            variant="standard"
            InputProps={{ endAdornment: item.hp > 0 ? '' : deathAdornment, inputMode: 'numeric', pattern: '[0-9.+-]*' }}
            defaultValue={item.hp}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                hpSubmit(event.target.value, item.hp, index);
              }
            }}
          />
        </ListItem>
      );
    });

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
        <Box
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            if (playerName === '') {
              setError(true);
              return;
            }
            setArenaSessionStorage(
              [...arenaSessionStorage, { name: playerName, initiative: 0, hp: 0 }],
            );
            setPlayerName('');
          }}
        >
          <TextField
            variant="filled"
            error={error && playerName === ''}
            value={playerName}
            onChange={(event) => {
              setError(false);
              setPlayerName(event.target.value);
            }}
          />
        </Box>
        <List>{combatantListItems}</List>
        <Button
          onClick={() => {
            sessionStorage.clear();
            setArenaSessionStorage([]);
          }}
        >
          Clear
        </Button>
      </Drawer>
    ),
  };
}

export default useArena;
