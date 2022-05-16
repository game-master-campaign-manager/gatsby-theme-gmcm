import React from 'react';
import {
  Box, ButtonGroup, Card, CardContent, ClickAwayListener, Drawer, Grow, List, ListItem, ListItemText, MenuItem, MenuList, Paper, Popper, SpeedDial, SpeedDialAction, SvgIcon, TextField, Tooltip, Typography,
} from '@mui/material';
import { Button, IconButton } from 'gatsby-theme-material-ui';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import arenaStrings from './arenaStrings';
import SwordWoman from '../../images/swordwoman.svg';
import SkullIcon from '../../images/icons/skull.svg';

/*
HOW TO ADD ARENA TO A GMCM PAGE
1) On parent component, create a state const to control Arena's open state.
2) Add the get/set state consts to Arena component props as "arenaOpen" & "setArenaOpen."
3) Wrap anything else in the component calling Arena in React.useMemo() (See Search.js
   <SearchResults />).
*/

export function AddMonsterButton() {
  return (
    <Tooltip title="Foo">
      <IconButton
        aria-label="Foo"
        sx={{
          position: 'absolute',
          top: '0.25rem',
          right: '0.25rem',
          '&::after': {
            content: '"+"',
            position: 'absolute',
            bottom: 0,
            left: 0,
            borderRadius: '50%',
            width: '12px',
            height: '12px',
            fontSize: '1.25rem',
            lineHeight: '12px',
            p: '0.25rem',
            boxSizing: 'content-box',
            backgroundColor: 'grey.800',
          },
        }}
        onClick={() => {
          console.log('FOO');
        }}
        // onClick={() => {
        //   enqueueSnackbar(`Added ${item.monster} to the Combat Tracker.`);
        //   setArenaSessionStorage([...arenaSessionStorage,
        //     {
        //       name: item.monster,
        //       hp: hpRoll.total || item.hp.value,
        //       initiative: initiativeRoll.total,
        //       type: 'monster',
        //     },
        //   ]);
        // }}
      >
        <SvgIcon>
          <SwordWoman />
        </SvgIcon>
      </IconButton>
    </Tooltip>
  );
}

export function ArenaAdder() {
  /*
  This will be a component that can be imported to search results in order to add a
  monster to the arena. NO IT WONT THIS WAS A TEST

  Also use this to add monsters to location notes. and npc table.

  REMOVE UPWARD ACTION
  IMPORT SPEEDDIAL_ACTIONS FROM CONSTANTS
  PUSH ARENA ACTION TO CSPEEDDIAL_ACTIONS
  MAYBE IMPRT THE WHOLE SPEED DIAL FROM NEW DIFF COMPONENT?
  MAYBE REMOVE ACTIONS FROM CONSTANTS AND PUT IN NEW COMPONENT?
  */
  const actions = [
    { icon: <ArrowUpwardIcon />, name: 'Scroll' },
    { icon: <SwordWoman />, name: 'Arena' },
  ];
  return (
    <SpeedDial
      aria-label="Speedial"
      sx={{ position: 'absolute', bottom: 2, right: 2 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
      ))}
    </SpeedDial>
  );
}

function Arena({ arenaOpen, setArenaOpen }) {
  console.log('Arena render');
  // Set Session Storage key name.
  const ssKey = 'gmcm-combatants';
  // - Get and parse the Session Storage data from browser.
  // - If no data is found, substitute an empty array string to be parsed.
  // - `window !== 'undefined'` lines are to avoid build process from running this code since no
  // browser exists during build.
  const parsedSessionData = typeof window !== 'undefined' ? window.JSON.parse(sessionStorage.getItem(ssKey) || '[]') : [];
  // Sort the pieces of Session Storage data by initiative.
  if (parsedSessionData.length > 0) {
    parsedSessionData.sort((a, b) => (a.initiative < b.initiative ? 1 : -1));
    typeof window !== 'undefined' && sessionStorage.setItem(ssKey, JSON.stringify(parsedSessionData));
  }
  // Set sorted+parsed Session Storage data as a state const.
  const [arenaSessionStorage, setArenaSessionStorage] = React.useState(parsedSessionData);
  const [turnIndex, setTurnIndex] = React.useState(0);

  const handleTurnClick = React.useCallback((direction) => {
    if (direction === 'next') {
      if (turnIndex === (arenaSessionStorage.length - 1)) {
        setTurnIndex(0);
        return;
      }
      setTurnIndex(turnIndex + 1);
      return;
    }
    if (direction === 'previous') {
      if (turnIndex === 0) {
        setTurnIndex(arenaSessionStorage.length - 1);
        return;
      }
      setTurnIndex(turnIndex - 1);
    }
  }, [arenaSessionStorage]);
  return (
    <Drawer anchor="right" open={arenaOpen} onClose={() => setArenaOpen(false)}>
      {React.useMemo(() => (
        <AddPlayer
          arenaSessionStorage={arenaSessionStorage}
          setArenaSessionStorage={setArenaSessionStorage}
        />
      ), [arenaSessionStorage])}
      <TurnAdvancement handleTurnClick={handleTurnClick} />
      {React.useMemo(() => (
        <CombatantList
          arenaSessionStorage={arenaSessionStorage}
          setArenaSessionStorage={setArenaSessionStorage}
          turnIndex={turnIndex}
        />
      ), [arenaSessionStorage, turnIndex])}
      <ClearArenaButton
        arenaSessionStorage={arenaSessionStorage}
        setArenaSessionStorage={setArenaSessionStorage}
      />
    </Drawer>
  );
}

function AddPlayer({ arenaSessionStorage, setArenaSessionStorage }) {
  const [playerName, setPlayerName] = React.useState('');
  const [error, setError] = React.useState(false);
  return (
    <Box
      component="form"
      sx={{ p: 2, typography: 'body2', textAlign: 'center' }}
      onSubmit={(event) => {
        event.preventDefault();
        if (playerName === '') {
          setError(true);
          return;
        }
        typeof window !== 'undefined' && setArenaSessionStorage(
          [...arenaSessionStorage, {
            name: playerName, initiative: 0, hp: 0, type: 'player',
          }],
        );
        setPlayerName('');
      }}
    >
      <TextField
        variant="filled"
        size="small"
        fullWidth
        label={arenaStrings.add}
        error={error && playerName === ''}
        value={playerName}
        InputProps={{
          endAdornment: (
            <IconButton type="submit">
              <PersonAddIcon />
            </IconButton>
          ),
        }}
        onChange={(event) => {
          setError(false);
          setPlayerName(
            event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1),
          );
        }}
      />
    </Box>
  );
}

function TurnAdvancement({ handleTurnClick }) {
  console.log('TurnAdvancement render');
  return (
    <ButtonGroup variant="contained" aria-label={arenaStrings.turns.aria} sx={{ alignSelf: 'center', mb: 2 }}>
      <Tooltip title={arenaStrings.turns.prev}>
        <Button onClick={() => handleTurnClick('previous')}>
          <ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />
        </Button>
      </Tooltip>
      <Typography variant="body2" sx={{ my: 'auto', px: 1 }}>{arenaStrings.turns.label}</Typography>
      <Tooltip title={arenaStrings.turns.next}>
        <Button onClick={() => handleTurnClick('next')}>
          <ArrowForwardIcon />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

function CombatantList({ arenaSessionStorage, setArenaSessionStorage, turnIndex }) {
  console.log('CombatantList render');
  const initiativeSubmit = React.useCallback((value, index) => {
    const arenaCopy = [...arenaSessionStorage];
    const arenaCopyItem = { ...arenaCopy[index] };
    arenaCopyItem.initiative = Number.isNaN(Number(parseInt(value, 10)))
      ? 0 : Number(parseInt(value, 10));
    arenaCopy[index] = arenaCopyItem;
    setArenaSessionStorage(arenaCopy);
  }, [arenaSessionStorage]);
  const combatantListMaker = React.useCallback((array, duplicatesArray = []) => array
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
        <Combatant
          key={`${item.name}-${Math.random()}`}
          item={item}
          index={index}
          dupes={dupes}
          turnIndex={turnIndex}
          arenaSessionStorage={arenaSessionStorage}
          setArenaSessionStorage={setArenaSessionStorage}
          initiativeSubmit={initiativeSubmit}
        />
      );
    }), [arenaSessionStorage]);
  // Set as empty because the useEffect that will be firing is going to fire on render.
  const [combatantListItems, setCombatantListItems] = React.useState([]);
  const combatantListRef = React.useRef(null);
  // IF arenaSessionStorage value is altered, reset the Session Storage data:
  React.useEffect(() => {
    console.log('CombatantList useEffect render');
    // Resort the data and recreate the list.
    setCombatantListItems(combatantListMaker(arenaSessionStorage));
    // Stringify and resend the data to Session Storage.
    typeof window !== 'undefined' && sessionStorage.setItem('gmcm-combatants', JSON.stringify(arenaSessionStorage));
  }, [arenaSessionStorage, turnIndex]);
  return (
    <Card raised sx={{ mx: 2, overflowY: 'scroll' }}>
      <CardContent>
        <List ref={combatantListRef} disablePadding sx={{ '& > li + li': { mt: 1 } }}>{combatantListItems}</List>
      </CardContent>
    </Card>
  );
}

function Combatant({
  item, index, dupes, turnIndex, arenaSessionStorage, setArenaSessionStorage, initiativeSubmit,
}) {
  // console.log(`Combatant ${index} render`);
  const deathAdornment = (
    <SvgIcon sx={{ width: '0.75rem' }}>
      <SkullIcon />
    </SvgIcon>
  );
  // Submit new HP value like above.
  const hpSubmit = React.useCallback((value, current, i) => {
    const arenaCopy = [...arenaSessionStorage];
    const arenaCopyItem = { ...arenaCopy[i] };
    console.info(`${arenaCopyItem.name} ${value.includes('+') ? arenaStrings.console.info.receives : arenaStrings.console.info.loses} ${value} ${arenaStrings.hp}`);
    const hpSanitized = Number.isNaN(Number(parseInt(value, 10))) ? 0 : Number(parseInt(value, 10));
    arenaCopyItem.hp = current + hpSanitized;
    arenaCopy[i] = arenaCopyItem;
    setArenaSessionStorage(arenaCopy);
  }, [arenaSessionStorage]);
  return (
    <ListItem
      key={`${item.name}-${Math.random()}`}
      disableGutters
      disablePadding
      className={`gmcm-Combatant-${item.type}`}
      sx={{
        '& input': {
          fontFamily: 'monospace',
          textAlign: 'center',
          px: 1,
          py: 0.5,
        },
        '& .gmcm-TextField-root': {
          mx: 2,
        },
      }}
    >
      <Box sx={{ width: '1.5rem' }}>{index === turnIndex && <DoubleArrowIcon color="primary" sx={{ display: 'block' }} />}</Box>
      {/* Initiative value */}
      <TextField
        size="small"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9.+-]*' }}
        defaultValue={item.initiative}
        onFocus={(event) => event.target.select()}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            initiativeSubmit(event.target.value, index);
          }
        }}
        sx={{ '& input': { width: '18px' } }}
      />
      {/* Combatant's name */}
      <ListItemText
        primary={item.name}
        secondary={dupes(item.name) > 1 && <em>{`# ${dupes(item.name)}`}</em>}
        primaryTypographyProps={{ variant: 'body2', sx: { fontWeight: 'bold', lineHeight: '1.6' } }}
        secondaryTypographyProps={{ component: 'span', sx: { ml: 1, lineHeight: '1.6' } }}
        sx={{ display: 'flex', flexDirection: 'row', maxWidth: '15rem' }}
      />
      {/* HP value */}
      <TextField
        size="small"
        label={arenaStrings.hp}
        InputProps={{ endAdornment: item.hp > 0 ? '' : (item.type === 'monster' && deathAdornment), inputMode: 'numeric', pattern: '[0-9.+-]*' }}
        defaultValue={item.hp}
        onFocus={(event) => event.target.select()}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            hpSubmit(event.target.value, item.hp, index);
          }
        }}
        sx={{ '& .gmcm-InputBase-adornedEnd': { pr: 1 }, '& input': { width: '28px' } }}
      />
      <Tooltip title={arenaStrings.delete}>
        <IconButton
          sx={{ ml: 'auto' }}
          onClick={() => {
            setArenaSessionStorage(
              [...arenaSessionStorage].filter((x) => x !== arenaSessionStorage[index]),
            );
          }}
        >
          <PersonOffIcon color="primary" />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}
// line 203
function ClearArenaButton({ arenaSessionStorage, setArenaSessionStorage }) {
  console.log('ClearArenaButton render');
  const anchorRef = React.useRef(null);
  const options = arenaStrings.clear.data;
  const clearTypes = ['monster', 'player', 'all'];
  const [clearOpen, setClearOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleToggle = () => {
    setClearOpen((prevOpen) => !prevOpen);
  };
  const handleClearClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setClearOpen(false);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setClearOpen(false);
  };
  const handleClearClick = (type) => {
    if (type === 'all') {
      sessionStorage.clear();
      setArenaSessionStorage([]);
    } else {
      const newStorage = [];
      [...arenaSessionStorage].forEach((combatant) => {
        type !== combatant.type && newStorage.push(combatant);
      });
      setArenaSessionStorage(newStorage);
    }
  };
  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label={arenaStrings.clear.aria} sx={{ alignSelf: 'center', m: 2 }}>
        <Button onClick={() => handleClearClick(clearTypes[selectedIndex])}>
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={clearOpen ? 'split-menu-menu' : undefined}
          aria-expanded={clearOpen ? 'true' : undefined}
          aria-label={arenaStrings.clear.selectAria}
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={clearOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            styles={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClearClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default React.memo(Arena);
