import React from 'react';
import { ListItem } from '@mui/material';

function combatData() {
  const ssCombatData = sessionStorage.getItem('gmcm-combatants') || '[]';
  const [combatantArray, setCombatantArray] = React.useState(
    JSON.parse(ssCombatData),
  );
  const [combatantList, setCombatantList] = React.useState('');
  React.useEffect(() => {
    setCombatantList(combatantArray.map((combatant) => (
      <ListItem key={Math.random()}>{combatant.name}</ListItem>
    )));
    sessionStorage.setItem('gmcm-combatants', JSON.stringify(combatantArray));
    console.log('woot');
  }, [combatantArray]);
  const addCombatant = (combatant = null) => {
    setCombatantArray([...combatantArray, combatant]);
  };
  return {
    // Either
    // A string of unparsed session storage data
    // OR an empty array as a string
    ssCombatData,
    // Parsed session storage data (array of objects)
    // Turns the strings of session storage data into usable data
    combatantArray,
    // Sets the above's value
    setCombatantArray,
    // Function for adding a new player/monster object to the combatantArray
    addCombatant,
    // JSX/HTML of the rows for combat tracker
    combatantList,
  };
}

export default combatData;
