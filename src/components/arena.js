// 1.2 Checklist
// XXX arena: clicking monster's add icon shouldn't open drawer (makes adding multiple monsters tedious). instead it should add the monster to the list (drawer closed) and give a snackbar notification that the monster was added.
// XXX arena: add a hotkey for the drawer. add hint text for the key on the drawer.
// XXX arena: use split button (https://mui.com/material-ui/react-button-group/#split-button) to have a button that gives option to clear all combatants or clear just npcs.
// arena: give monster add icon a "+" using ::after or something.
// arena: click monster to see its stats
// legal: comply with this (https://www.thearcanelibrary.com/blogs/news/how-to-use-the-open-game-license)
// Homepage: 'What's new explaining combat drawer.
// Arena: button should be a floating button, not in nav.
// XXX arena: style the drawer.
// general: theme options to exclude default content pieces.
// legal: use Tabs?
// arena: remove strings to constants.
import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import { Button, IconButton } from 'gatsby-theme-material-ui';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SvgIcon from '@mui/material/SvgIcon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SkullIcon from '../images/icons/skull.svg';

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
    <IconButton size="small" sx={{ px: 0 }}>
      <SvgIcon sx={{ width: '0.75rem' }}>
        <SkullIcon />
      </SvgIcon>
    </IconButton>
  );
  // Keyboard shortcut for Drawer.
  React.useEffect(() => {
    const ctrlC = (e) => {
      if (e.ctrlKey && e.key === 'c') {
        setArenaDrawerOpen(!arenaDrawerOpen);
      }
    };
    window.addEventListener('keyup', ctrlC);
    return () => window.removeEventListener('keyup', ctrlC);
  }, [arenaDrawerOpen]);
  // Turn indicator.
  const [turnIndex, setTurnIndex] = React.useState(0);
  const handleTurnClick = (direction) => {
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
  };
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
    arenaCopyItem.hp = current + hpSanitized;
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
            secondary={dupes(item.name) > 1 && (
              <em>
                #
                {dupes(item.name)}
              </em>
            )}
            primaryTypographyProps={{ variant: 'body2' }}
            secondaryTypographyProps={{ component: 'span', sx: { ml: 1, lineHeight: '1.75' } }}
            sx={{ display: 'flex', flexDirection: 'row', maxWidth: '15rem' }}
          />
          {/* HP value */}
          <TextField
            size="small"
            InputProps={{ endAdornment: item.hp > 0 ? '' : deathAdornment, inputMode: 'numeric', pattern: '[0-9.+-]*' }}
            defaultValue={item.hp}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                hpSubmit(event.target.value, item.hp, index);
              }
            }}
            sx={{ '& .gmcm-InputBase-adornedEnd': { pr: 1 }, '& input': { width: '28px' } }}
          />
          <Tooltip title="Delete Player">
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
    });

  // IF arenaSessionStorage value is altered, reset the Session Storage data:
  React.useEffect(() => {
    console.log('arenaSessionStorage useEffect');
    console.log(`turnIndex: ${turnIndex}`);
    // Resort the data and recreate the list.
    setCombatantListItems(combatantListMaker(arenaSessionStorage));
    // Stringify and resend the data to Session Storage.
    sessionStorage.setItem(ssKey, JSON.stringify(arenaSessionStorage));
  }, [arenaSessionStorage, turnIndex]);

  // Clear button stuff.
  const options = ['Clear monsters', 'Clear players', 'Clear all combatants'];
  const anchorRef = React.useRef(null);
  const combatantListRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [clearOpen, setClearOpen] = React.useState(false);
  const handleClearClick = () => {
    const clicked = options[selectedIndex];
    const { children } = combatantListRef.current;
    const found = [];
    const finder = (type) => {
      [...children].forEach((item, index) => {
        if (item.classList.contains(`gmcm-Combatant-${type}`)) {
          found.push(index);
        }
      });
    };
    const remover = () => {
      let arenaCopy = [...arenaSessionStorage];
      arenaCopy = arenaCopy.filter((value, index) => found.indexOf(index) === -1);
      setArenaSessionStorage(arenaCopy);
    };
    if (clicked === 'Clear all combatants') {
      sessionStorage.clear();
      setArenaSessionStorage([]);
    } else {
      if (clicked === 'Clear monsters') {
        finder('monster');
      }
      if (clicked === 'Clear players') {
        finder('player');
      }
      remover();
    }
  };
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

  return {
    arenaSessionStorage,
    setArenaSessionStorage,
    arenaDrawerOpen,
    setArenaDrawerOpen,
    arenaRender: (
      <Drawer anchor="right" open={arenaDrawerOpen} onClose={() => setArenaDrawerOpen(false)}>
        {/* Add player form */}
        <Box
          component="form"
          sx={{
            px: 2, py: 2, typography: 'body2', textAlign: 'center',
          }}
          onSubmit={(event) => {
            event.preventDefault();
            if (playerName === '') {
              setError(true);
              return;
            }
            setArenaSessionStorage(
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
            label="Add a player"
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
        {/* Turn advancement */}
        <ButtonGroup variant="contained" aria-label="turn advancer" sx={{ alignSelf: 'center', mb: 2 }}>
          <Button onClick={() => handleTurnClick('previous')}>
            <ArrowForwardIcon sx={{ transform: 'rotate(180deg)' }} />
          </Button>
          <Typography variant="body2" sx={{ my: 'auto', px: 1 }}>Turn Direction</Typography>
          <Button onClick={() => handleTurnClick('next')}>
            <ArrowForwardIcon />
          </Button>
        </ButtonGroup>
        {/* Combatant List */}
        {combatantListItems.length > 0 && (
          <Card raised sx={{ mx: 2 }}>
            <CardContent>
              <List ref={combatantListRef} disablePadding sx={{ '& > li + li': { mt: 1 } }}>{combatantListItems}</List>
            </CardContent>
          </Card>
        )}
        {/* Clear Button Group */}
        <ButtonGroup variant="contained" ref={anchorRef} aria-label="clear buttons" sx={{ alignSelf: 'center', mt: 2 }}>
          <Button onClick={handleClearClick}>{options[selectedIndex]}</Button>
          <Button
            size="small"
            aria-controls={clearOpen ? 'split-menu-menu' : undefined}
            aria-expanded={clearOpen ? 'true' : undefined}
            aria-label="select clear option"
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
        {/* Hotkey notice */}
        <Typography
          variant="caption"
          sx={{
            px: 2, alignSelf: 'center', mt: 'auto', pb: 2,
          }}
        >
          Press CTRL+C to toggle the Combat Drawer.
        </Typography>
      </Drawer>
    ),
  };
}

export default useArena;
