import React from 'react';
import {
  Box, Drawer, FormControl, Input, InputLabel, List,
} from '@mui/material';
import { IconButton } from 'gatsby-theme-material-ui';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import combatData from './session-storage';

const arenaDrawerState = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  React.useEffect(() => {
  }, [drawerOpen]);
  return {
    drawerOpen, setDrawerOpen,
  };
};

function Arena({ drawerOpen, setDrawerOpen }) {
  const { combatantArray, combatantList, addCombatant } = combatData();
  const [playerName, setPlayerName] = React.useState('');
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    console.log('bar');
  }, [combatantArray]);
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          if (playerName === '') {
            setError(true);
            return;
          }
          addCombatant({ name: playerName });
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
      <List id="combatant-list">{combatantList}</List>
    </Drawer>
  );
}

export { Arena, arenaDrawerState };

{ /* // import {
//   Box, Drawer, List, ListItem, TextField,
// } from '@mui/material';
// import { Button, ListItemButton } from 'gatsby-theme-material-ui';

// function Arena({ drawerOpen, setDrawerOpen }) {
//   const ssCombatData = sessionStorage.getItem('gmcm-combatants') || '[]';
//   const [combatantArray, setCombatantArray] = React.useState(
//     JSON.parse(ssCombatData),
//   );
//   const [playerName, setPlayerName] = React.useState(null);
//   const [combatantList, setCombatantList] = React.useState('');

//   React.useEffect(() => {
//     sessionStorage.setItem('gmcm-combatants', JSON.stringify(combatantArray));
//     setCombatantList(combatantArray.map((combatant) => (
//       <ListItem key={Math.random()}>{combatant.name}</ListItem>
//     )));
//   }, [combatantArray]);

//   const addCombatant = (combatant = null) => {
//     setCombatantArray([...combatantArray, combatant]);
//   };

//   return (
//     <Box>
//       <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//         <TextField
//           defaultValue={playerName}
//           onChange={(event) => {
//             setPlayerName(event.target.value);
//           }}
//         />
//         <Button
//           onClick={() => {
//             addCombatant({
//               name: playerName,
//               health: '25/25',
//             });
//           }}
//         >
//           add player
//         </Button>
//         <List>{combatantList}</List>
//       </Drawer>
//     </Box>
//   );
// } */ }
