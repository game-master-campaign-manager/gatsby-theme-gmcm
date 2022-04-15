import React from 'react';
import {
  Box, Drawer, List, ListItem, TextField,
} from '@mui/material';
import { Button, ListItemButton } from 'gatsby-theme-material-ui';

function Arena({ drawerOpen, setDrawerOpen }) {
  const ssCombatData = sessionStorage.getItem('gmcm-combatants') || '[]';
  const [combatantArray, setCombatantArray] = React.useState(
    JSON.parse(ssCombatData),
  );
  const [playerName, setPlayerName] = React.useState(null);
  const [combatantList, setCombatantList] = React.useState('');

  React.useEffect(() => {
    sessionStorage.setItem('gmcm-combatants', JSON.stringify(combatantArray));
    setCombatantList(combatantArray.map((combatant) => (
      <ListItem key={Math.random()}>{combatant.name}</ListItem>
    )));
  }, [combatantArray]);

  const addCombatant = (combatant = null) => {
    setCombatantArray([...combatantArray, combatant]);
  };

  return (
    <Box>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <TextField
          defaultValue={playerName}
          onChange={(event) => {
            setPlayerName(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            // combatantList.push('batman');
            // saveSessionStorage();
            // setTest('butt');
            addCombatant({
              name: playerName,
              health: '25/25',
            });
          }}
        >
          add player
        </Button>
        <List>{combatantList}</List>
      </Drawer>
    </Box>
  );
}

// function Arena({ drawerOpen, setDrawerOpen }) {
//   const [playerField, setPlayerField] = React.useState(null);
//   const [combatantList, setCombatantList] = React.useState(null);
//   const combatants = [];
//   // const txt = 'hello world';
//   sessionStorage.setItem('my-key', ['hi', 'how', 'are', 'you']);
//   console.log(sessionStorage.getItem('my-key'));

//   const addToCombatants = () => {
//     combatants.push(playerField);
//     createCombatantList();
//   };

//   return (
//     <Box>
//       <Drawer id="arena" anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//         <List>
//           <ListItem>
//             <ListItemButton>add player</ListItemButton>
//           </ListItem>
//         </List>
//         <TextField
//           variant="standard"
//           defaultValue={playerField}
//           onChange={(event) => setPlayerField(event.target.value)}
//         />
//         <Button
//           onClick={() => {
//             combatants.push(playerField);
//             // add value of text field to array of combatants
//             // when array is updated a useeffect iterates over the array to make <LI>s
//           }}
//         >
//           add
//         </Button>
//         <List>{combatantList}</List>
//       </Drawer>
//     </Box>
//   );
// }

export default Arena;
