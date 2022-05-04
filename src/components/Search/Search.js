import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import WatchLater from '@mui/icons-material/WatchLater';
import SocialDistance from '@mui/icons-material/SocialDistance';
import Extension from '@mui/icons-material/Extension';
import { IconButton } from 'gatsby-theme-material-ui';
import Masonry from '@mui/lab/Masonry';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { useSnackbar } from 'notistack';
import MarkdownView from 'react-showdown';
import Layout from '../Layout/Layout';
import { Attack, Dice } from '../Dice/Dice';
import * as CREATURE_TYPES from '../../images/creature-types';
import * as MAGIC_TYPES from '../../images/magic-types';
import DmcmAttackIcon from '../../images/bullseye.svg';
import useArena from '../useArena/useArena';
import SwordWoman from '../../images/swordwoman.svg';

// Setting context for Arena drawer stuff
const ArenaContext = React.createContext('Arena');

function Search({
  location, page, spells, monsters,
}) {
  // ToggleButtonGroup and search category setup
  const [searchCategory, setSearchCategory] = React.useState(location.state && location.state.category ? location.state.category : 'monsters');
  const handleClick = (event, newCategory) => {
    setSearchCategory(newCategory);
  };
  const searchCategoryButtons = page.toggle.buttons.map((button) => (
    <ToggleButton key={button.label} value={button.label} aria-label={button.aria}>
      {button.label.toUpperCase()}
    </ToggleButton>
  ));

  // Arena data
  const {
    arenaDrawerOpen, setArenaDrawerOpen, arenaRender, arenaSessionStorage, setArenaSessionStorage,
  } = useArena();

  // Search data
  const searchData = {
    monsters: [],
    spells: [],
    items: [],
  };
  // Add data to searchData categories and sort them.
  // this stuff may need to be in a useEffect...
  const pusher = (source) => {
    source.forEach((x) => {
      searchData[searchCategory] = [
        ...searchData[searchCategory],
        ...x.childMdx.frontmatter[searchCategory],
      ];
    });
  };
  if (searchCategory === 'monsters') {
    pusher(monsters.nodes);
    searchData[searchCategory].sort((a, b) => a.monster.localeCompare(b.monster));
  }
  if (searchCategory === 'spells') {
    pusher(spells.nodes);
    searchData[searchCategory].sort((a, b) => a.spell.localeCompare(b.spell));
  }

  // Starting search query if user arrived here from a special link.
  let startingValue = [];
  if (location.state && location.state.query) {
    const result = searchData[searchCategory].filter((obj) => (
      obj.name.toUpperCase() === location.state.query.toUpperCase()
    ));
    startingValue = result;
  }
  const [value, setValue] = React.useState(startingValue);

  return (
    <Layout title={page.title} arenaRender={arenaRender}>
      <ToggleButtonGroup
        value={searchCategory}
        exclusive
        onChange={handleClick}
        aria-label={page.toggle.aria}
      >
        {searchCategoryButtons}
      </ToggleButtonGroup>
      <Box sx={{ mt: 2 }}>
        <SearchForm
          searchTitle={searchCategory}
          value={value}
          setValue={setValue}
          data={searchData[searchCategory]}
          placeholder={page.search.placeholder}
        />
        { /* eslint-disable-next-line react/jsx-no-constructed-context-values */ }
        <ArenaContext.Provider value={{
          arenaDrawerOpen,
          setArenaDrawerOpen,
          arenaRender,
          arenaSessionStorage,
          setArenaSessionStorage,
          page,
        }}
        >
          <SearchResults value={value} />
        </ArenaContext.Provider>
      </Box>
    </Layout>
  );
}

function SearchForm({
  data, setValue, value, searchTitle, placeholder,
}) {
  return (
    <Box sx={{
      position: 'sticky', top: '1rem', zIndex: 'appBar', boxShadow: 5,
    }}
    >
      <Paper>
        <Autocomplete
          multiple
          options={data}
          getOptionLabel={(option) => option.monster || option.spell}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              placeholder={placeholder}
              label={searchTitle}
              {...params}
            />
          )}
          value={value || []}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{ '& .gmcm-InputLabel-root': { textTransform: 'capitalize' } }}
        />
      </Paper>
    </Box>
  );
}

function SearchResults({ value }) {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Paper>
        {value.length > 0 && (
          <Masonry columns={2} spacing={2} sx={{ m: 0 }}>
            {value.map((item) => (
              <SearchResultsItem key={item.monster || item.spell} item={item} />
            ))}
          </Masonry>
        )}
      </Paper>
    </Box>
  );
}

function SearchResultsItem({ item }) {
  const itemName = item.monster || item.spell;
  return (
    <Box id={itemName.toLowerCase().replaceAll(' ', '-')}>
      <Card raised sx={{ position: 'relative' }}>
        <SearchResultsItemHeader item={item} />
        <SearchResultsItemContent item={item} />
      </Card>
    </Box>
  );
}

function SearchResultsItemHeader({ item }) {
  // Using context to avoid long trail of prop forwarding.
  const { arenaSessionStorage, setArenaSessionStorage, page } = React.useContext(ArenaContext);
  let DmcmIcon;
  let subtitle;
  let combatIcon = false;
  let hpRoll = '';
  let initiativeRoll = '';

  if (item.monster) {
    Object.keys(CREATURE_TYPES).forEach((c) => {
      if (item.type && item.type.toUpperCase().search(c.toUpperCase()) > -1) {
        DmcmIcon = CREATURE_TYPES[c];
      }
    });
    subtitle = item.type ? item.type : page.unknown;
    combatIcon = true;
    hpRoll = new DiceRoll(item.hp && item.hp.notes ? item.hp.notes : '0');
    initiativeRoll = new DiceRoll(item.abilities && item.abilities.dex ? `d20+${Math.floor((item.abilities.dex - 10) / 2)}` : 'd20');
  } else if (item.spell) {
    Object.keys(MAGIC_TYPES).forEach((m) => {
      if (item.school && item.school.toUpperCase().search(m.toUpperCase()) > -1) {
        DmcmIcon = MAGIC_TYPES[m];
      }
    });
    const ritual = item.ritual ? (
      <Tooltip
        arrow
        key={item.spell}
        sx={{ boxShadow: 5 }}
        title={<Typography fontSize={15}>{page.ritualText}</Typography>}
      >
        <Box component="span" sx={{ borderBottom: '1px dashed', cursor: 'help' }}>
          {page.ritual}
        </Box>
      </Tooltip>
    ) : page.spell;
    subtitle = [`${page.spellLevelLabel} ${item.level && item.level}, ${item.school && item.school} `, ritual];
  } else {
    console.error('Searched item not recognized. Make sure your content follows frontmatter guidelines.');
  }
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <CardHeader
        disableTypography
        avatar={DmcmIcon && (
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
            }}
          >
            <SvgIcon>
              <DmcmIcon />
            </SvgIcon>
          </Avatar>
        )}
        title={<Typography sx={{ wordBreak: 'break-all', mr: '2rem' }} variant="h6" component="h3">{item.monster || item.spell}</Typography>}
        subheader={<Typography variant="body1">{subtitle}</Typography>}
        sx={{ overflow: 'hidden' }}
      />
      {combatIcon && (
        <Tooltip title="Add monster to Combat Tracker">
          <IconButton
            aria-label="Add monster to Combat Tracker"
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
              enqueueSnackbar(`Added ${item.monster} to the Combat Tracker.`);
              setArenaSessionStorage([...arenaSessionStorage,
                {
                  name: item.monster,
                  hp: hpRoll.total || item.hp.value,
                  initiative: initiativeRoll.total,
                  type: 'monster',
                },
              ]);
            }}
          >
            <SvgIcon>
              <SwordWoman />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      )}
      <Divider />
    </>
  );
}

function SearchResultsItemContent({ item }) {
  const content = (
    item.monster && <SearchResultItemContentMonster monster={item} />
  ) || (
    item.spell && <SearchResultItemContentSpell spell={item} />
  );
  return (
    <CardContent>
      {content}
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{item.source}</Typography>
    </CardContent>
  );
}

function SearchResultItemContentMonster({ monster }) {
  return (
    <>
      <MonsterAbilityList abilities={monster.abilities} />
      <MonsterStats monster={monster} />
    </>
  );
}

function MonsterAbilityList({ abilities }) {
  return (
    <ButtonGroup variant="contained" sx={{ width: '100%', justifyContent: 'center' }}>
      {Object.keys(abilities).map((ability) => {
        const modifier = Math.floor((abilities[ability] - 10) / 2);
        return (
          <Dice
            key={ability}
            r={`d20+${modifier}`}
            variant="abilityButton"
            ability={ability}
            value={abilities[ability]}
            modifier={modifier}
            disableText
          />
        );
      })}
    </ButtonGroup>
  );
}

function MonsterStats({ monster }) {
  const { page } = React.useContext(ArenaContext);
  const monsterStrings = page.stats.monsters;

  const simpleStat = (stat) => {
    const listItems = [];
    if (typeof stat === 'object' || typeof stat === 'string') {
      if (typeof stat === 'object' && stat !== null) {
        stat.forEach((s) => {
          listItems.push(s);
        });
      }
      if (typeof stat === 'string') {
        listItems.push(stat);
      }
      return listItems.join(', ');
    }
    console.error('Check your frontmatter or search.js');
    return `Error in frontmatter formatting for: ${stat} - refer to readme documentation.`;
  };
  const speedRegEx = /^\d+\sft\./;

  const addProps = (components, defaultProps) => {
    const withProps = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, Component] of Object.entries(components)) {
      withProps[key] = (props) => <Component {...defaultProps} {...props} />;
    }
    return withProps;
  };
  const shortcodes = { Attack, Dice };
  const someDefaultProps = { monster: monster.monster };
  const shortcodesWithProps = React.useMemo(
    () => addProps(shortcodes, someDefaultProps),
    [someDefaultProps],
  );

  return (
    <List sx={{ display: 'flex', flexWrap: 'wrap', typography: 'body1' }}>
      {[monster.ac, monster.hp].map((stat, index) => (
        <ListItem
          key={Math.random()}
          sx={{
            flex: '1 1 50%',
            '& .dmcm-ListItemSecondaryAction-root': {
              // 04/2022
              // This is a hack. When Snackbar is placed inside ListItem's secondaryAction
              // property (or as child element <ListItemSecondaryItem />), the Snackbar does
              // not appear in the correct location.
              // (https://github.com/mui/material-ui/issues/32152)
              // Removing "transform" rule on .dmcm-ListItemSecondaryAction-root fixes.
              transform: 'none',
              // Compensating for the above rule.
              // Should not hardcode this measurement.
              // Ideal: transform: translateY(50%);
              top: 'calc(50% - 20px)',
            },
          }}
          secondaryAction={index === 1 && stat.notes && <Dice disableText r={stat.notes} />}
        >
          <ListItemText
            primary={monsterStrings.life[index]}
            secondary={stat && (`${stat.value} ${stat.notes ? `(${stat.notes})` : ''}`)}
          />
        </ListItem>
      ))}
      {[monster.speed, monster.saves, monster.skills, monster.senses].map((stat, index) => stat && (
        <ListItem key={monsterStrings.table[index].title} sx={{ display: 'block', flex: '2 2 100%' }}>
          <ListItemText primary={monsterStrings.table[index].title} />
          <TableContainer component={Paper} sx={{ boxShadow: 10 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {monsterStrings.table[index].columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stat.map((s) => {
                  // 0 = Movement speed(s)
                  // 1 = Saves
                  // 2 = Skills
                  // 3 = Senses
                  if (index === 0 || index === 3) {
                    // Created tableRow(array) to avoid code duplication.
                    return (
                      <MonsterStatsTableRow
                        key={s}
                        textTransform="capitalize"
                        cells={[
                          speedRegEx.test(s) ? 'walk' : s.split(' ')[0],
                          speedRegEx.test(s) ? s : s.slice(s.indexOf(' ') + 1),
                        ]}
                      />
                    );
                  }
                  return (
                    <MonsterStatsTableRow
                      key={s.name}
                      cells={[
                        s.name,
                        s.modifier >= 0 ? `+${s.modifier}` : s.modifier,
                      ]}
                      textTransform={index === 2 ? 'capitalize' : 'uppercase'}
                      button
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
      ))}
      {[
        monster.dmgvulnerabilities,
        monster.dmgresistances,
        monster.dmgimmunities,
        monster.cdnimmunities,
        monster.languages,
        monster.challenge,
      ].map((stat, index) => stat && (
        <ListItem key={monsterStrings.simple[index]} sx={{ flex: '1 1 50%' }}>
          <ListItemText primary={monsterStrings.simple[index]} secondary={simpleStat(stat)} />
        </ListItem>
      ))}
      {[monster.traits, monster.actions, monster.reactions, monster.legendaryactions]
        .map((stat, index) => stat && (
          <ListItem key={monsterStrings.info[index]} sx={{ flex: '2 2 100%', display: 'block' }}>
            <ListItemText primary={monsterStrings.info[index]} />
            <Divider />
            <List disablePadding>
              {stat.map((s) => (
                <ListItem key={s.name}>
                  <ListItemText
                    primary={s.name}
                    secondary={
                      <MarkdownView markdown={s.content} components={shortcodesWithProps} />
                    }
                    secondaryTypographyProps={{ component: 'div', variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </ListItem>
        ))}
    </List>
  );
}

function MonsterStatsTableRow({ cells, textTransform, button }) {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {cells.map((cell, index) => (
        <TableCell key={cell} sx={{ textTransform: textTransform || 'none' }}>
          <Box component="span">{cell}</Box>
          {(button && index > 0) ? <Dice disableText r={`d20${cell}`} /> : ''}
        </TableCell>
      ))}
    </TableRow>
  );
}

function SearchResultItemContentSpell({ spell }) {
  return (
    <>
      <SpellStats spell={spell} />
      <MarkdownView components={{ Dice }} markdown={spell.description} />
    </>
  );
}

function SpellStats({ spell }) {
  const { page } = React.useContext(ArenaContext);
  const spellStatLabels = page.stats.spells;
  const spellStatIcons = [<WatchLater />, <SocialDistance />, <Extension />, <WatchLater />, <DmcmAttackIcon width="24" fill="white" />];
  return (
    <List sx={{ display: 'flex', flexWrap: 'wrap', typography: 'body1' }} dense>
      {[
        spell.castingTime, spell.range, spell.components, spell.duration, spell.attackSave,
      ].map((stat, index) => (
        <ListItem key={spellStatLabels[index]} sx={{ flex: '1 1 50%' }}>
          <ListItemIcon>
            {// Put a tooltip on the "Components" stat icon.
            index === 2 ? (
              <Tooltip title="Verbal (V), Somatic (S), or Material (M)">{spellStatIcons[index]}</Tooltip>
            ) : spellStatIcons[index]
            }
          </ListItemIcon>
          <ListItemText
            primary={spellStatLabels[index]}
            secondaryTypographyProps={{ component: 'div', variant: 'body2' }}
            secondary={index === 5 ? (
              <>
                {stat}
                {stat && stat.toLowerCase() !== 'none' && <Dice disableText r={stat} />}
              </>
            ) : stat}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default Search;
