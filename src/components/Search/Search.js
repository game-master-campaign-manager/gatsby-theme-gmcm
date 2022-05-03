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
import WatchLater from '@mui/icons-material/WatchLater';
import SocialDistance from '@mui/icons-material/SocialDistance';
import Extension from '@mui/icons-material/Extension';
import { IconButton } from 'gatsby-theme-material-ui';
import Masonry from '@mui/lab/Masonry';
import MarkdownView from 'react-showdown';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { useSnackbar } from 'notistack';
import Layout from '../Layout/Layout';
import { Attack, Dice } from '../Dice/Dice';
import * as CREATURE_TYPES from '../../images/creature-types';
import * as MAGIC_TYPES from '../../images/magic-types';
import DmcmAttackIcon from '../../images/bullseye.svg';
import useArena from '../useArena/useArena';
import SwordWoman from '../../images/swordwoman.svg';
import searchStrings from './searchStrings';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

// Setting context for Arena drawer stuff
// const ArenaDrawerOpenContext = React.createContext(undefined);
// const ArenaSessionStorageContext = React.createContext(undefined);
// const SetArenaSessionStorageContext = React.createContext(undefined);
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
  // const contextValue = React.useMemo(() => [
  //   arenaDrawerOpen, setArenaDrawerOpen, arenaRender, arenaSessionStorage, setArenaSessionStorage,
  // ], [arenaDrawerOpen, arenaRender, arenaSessionStorage]);
  // https://reactjs.org/docs/context.html#consuming-multiple-contexts
  // const ContextNodes = ({ children, all the Provider nodes}) => (
  //   <providernode>
  //     <providernode>
  //       {children}
  //     </providernode>
  //   </providernode>
  // );

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
      <Box>
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
      <Box
        key={Math.random()}
        component="span"
        title={page.ritualExplainer}
        sx={{ borderBottom: '1px dashed', cursor: 'help' }}
      >
        {page.ritual}
      </Box>
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
                  hp: hpRoll.total,
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
                  // 3 = Senses
                  if (index === 0 || index === 3) {
                    // Created tableRow(array) to avoid code duplication.
                    return (
                      <MonsterStatsTableRow
                        key={s}
                        cells={[
                          speedRegEx.test(s) ? 'walk' : s.split(' ')[0],
                          speedRegEx.test(s) ? s : s.slice(s.indexOf(' ') + 1),
                        ]}
                        textTransform="capitalize"
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
      {[monster.traits, monster.actions, monster.reactions, monster.lgdyactions]
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

function MonsterStatsTableRow() {
  return null;
}

function SearchResultItemContentSpell() {
  return null;
}

// look into useContext for passing drawer state/page values.

{ /*
function Search({
  location, page, spells, monsters,
}) {
  const {
    arenaDrawerOpen, setArenaDrawerOpen, arenaRender, arenaSessionStorage, setArenaSessionStorage,
  } = useArena();
  const search = new URLSearchParams(location.search.substring(1));
  const category = search.get('category');
  const searchData = {
    monsters: [],
    spells: [],
  };
  let searchTitle = '';
  page.categories.forEach((cat) => {
    if (category === cat.shortName) {
      searchTitle = cat.title;
    }
  });
  // Populate searchData with the appropriate data.
  if (category && searchTitle.length) {
    const pusher = (source) => {
      source.forEach((x) => {
        searchData[category] = [...searchData[category], ...x.childMdx.frontmatter[category]];
      });
    };
    if (category === 'monsters') {
      pusher(monsters.nodes);
      searchData[category].sort((a, b) => a.monster.localeCompare(b.monster));
    }
    if (category === 'spells') {
      pusher(spells.nodes);
      searchData[category].sort((a, b) => a.spell.localeCompare(b.spell));
    }
  } else {
    console.error('GMCM ERROR: URL Param: \'category\' is missing. Search will not work.');
  }

  let startingValue;
  if (location.state && location.state.query) {
    const result = searchData[category].filter((obj) => (
      obj.name.toUpperCase() === location.state.query.toUpperCase()
    ));
    startingValue = result;
  }
  const [value, setValue] = React.useState(startingValue || []);
  return (
    <Layout
      title={searchTitle}
      arenaRender={arenaRender}
    >
      <Box>
        <SearchForm
          searchTitle={searchTitle}
          value={value}
          setValue={setValue}
          data={searchData[category]}
        />
        <SearchResults
          value={value}
          arenaDrawerOpen={arenaDrawerOpen}
          setArenaDrawerOpen={setArenaDrawerOpen}
          arenaSessionStorage={arenaSessionStorage}
          setArenaSessionStorage={setArenaSessionStorage}
          page={page}
        />
      </Box>
    </Layout>
  );
}

function SearchForm({
  data, setValue, value, searchTitle,
}) {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: '1rem',
        zIndex: 'appBar',
        boxShadow: 5,
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
              {...params}
              label={searchTitle}
              placeholder="Search"
            />
          )}
          value={value || []}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Paper>
    </Box>
  );
}

function SearchResults({
  value,
  arenaDrawerOpen,
  setArenaDrawerOpen,
  arenaSessionStorage,
  setArenaSessionStorage,
  page,
}) {
  return (
    <Box
      sx={{
        marginTop: 2,
      }}
    >
      <Paper>
        {value.length > 0 && (
          <Masonry columns={2} spacing={2} sx={{ m: 0 }}>
            {value.map((item) => (
              <SearchResultsItem
                key={item.monster || item.spell}
                item={item}
                arenaDrawerOpen={arenaDrawerOpen}
                setArenaDrawerOpen={setArenaDrawerOpen}
                arenaSessionStorage={arenaSessionStorage}
                setArenaSessionStorage={setArenaSessionStorage}
                page={page}
              />
            ))}
          </Masonry>
        )}
      </Paper>
    </Box>
  );
}

function SearchResultsItem({
  item,
  arenaDrawerOpen,
  setArenaDrawerOpen,
  arenaSessionStorage,
  setArenaSessionStorage,
  page,
}) {
  const itemName = item.monster || item.spell;
  return (
    <Box id={itemName.toLowerCase().replaceAll(' ', '-')}>
      <Card raised sx={{ position: 'relative' }}>
        <SearchResultsItemHeader
          item={item}
          arenaDrawerOpen={arenaDrawerOpen}
          setArenaDrawerOpen={setArenaDrawerOpen}
          arenaSessionStorage={arenaSessionStorage}
          setArenaSessionStorage={setArenaSessionStorage}
          page={page}
        />
        <SearchResultsItemContent item={item} page={page} />
      </Card>
    </Box>
  );
}
function SearchResultsItemHeader({
  item, arenaSessionStorage, setArenaSessionStorage, page,
}) {
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
    subtitle = item.type ? item.type : 'Unknown';
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
      <Box
        key={Math.random()}
        component="span"
        title={page.ritualExplainer}
        sx={{ borderBottom: '1px dashed', cursor: 'help' }}
      >
        ritual
      </Box>
    ) : 'spell';
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
              // setArenaDrawerOpen(!arenaDrawerOpen);
              setArenaSessionStorage([...arenaSessionStorage,
                {
                  name: item.monster,
                  hp: hpRoll.total,
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

function SearchResultsItemContent({ item, page }) {
  const content = (
    item.monster && <SearchResultItemContentMonster monster={item} page={page} />
  ) || (
    item.spell && <SearchResultItemContentSpell spell={item} page={page} />
  );
  return (
    <CardContent>
      {content}
      <Typography
        variant="body2"
        sx={{
          fontStyle: 'italic',
        }}
      >
        {item.source}
      </Typography>
    </CardContent>
  );
}

function SearchResultItemContentMonster({ monster, page }) {
  return (
    <>
      <MonsterAbilityList abilities={monster.abilities} />
      <MonsterStats monster={monster} page={page} />
    </>
  );
}

function MonsterAbilityList({ abilities }) {
  return (
    <ButtonGroup
      variant="contained"
      sx={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
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

function MonsterStats({ monster, page }) {
  const {
    ac,
    hp,
    speed,
    saves,
    skills,
    dmgvulnerabilities,
    dmgresistances,
    dmgimmunities,
    cdnimmunities,
    senses,
    languages,
    challenge,
    traits,
    actions,
    reactions,
    lgdyactions,
  } = monster;

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
      {[ac, hp].map((stat, index) => (
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
            primary={page.stats.monsters.life[index]}
            secondary={stat && (`${stat.value} ${stat.notes ? `(${stat.notes})` : ''}`)}
          />
        </ListItem>
      ))}
      {[speed, saves, skills, senses].map((stat, index) => stat && (
        <ListItem
          key={page.stats.monsters.table[index].title}
          sx={{ display: 'block', flex: '2 2 100%' }}
        >
          <ListItemText primary={page.stats.monsters.table[index].title} />
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 10,
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  {page.stats.monsters.table[index].columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stat.map((s) => {
                  // 0 = Movement speed(s)
                  // 3 = Senses
                  if (index === 0 || index === 3) {
                    // Created tableRow(array) to avoid code duplication.
                    return (
                      <MonsterStatsTableRow
                        key={s}
                        cells={[
                          speedRegEx.test(s) ? 'walk' : s.split(' ')[0],
                          speedRegEx.test(s) ? s : s.slice(s.indexOf(' ') + 1),
                        ]}
                        textTransform="capitalize"
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
        dmgvulnerabilities,
        dmgresistances,
        dmgimmunities,
        cdnimmunities,
        languages,
        challenge,
      ].map((stat, index) => stat && (
        <ListItem
          key={page.stats.monsters.simple[index]}
          sx={{
            flex: '1 1 50%',
          }}
        >
          <ListItemText
            primary={page.stats.monsters.simple[index]}
            secondary={simpleStat(stat)}
          />
        </ListItem>
      ))}
      {[traits, actions, reactions, lgdyactions].map((stat, index) => stat && (
        <ListItem
          key={page.stats.monsters.info[index]}
          sx={{
            flex: '2 2 100%',
            display: 'block',
          }}
        >
          <ListItemText primary={page.stats.monsters.info[index]} />
          <Divider />
          <List disablePadding>
            {stat.map((s) => (
              <ListItem key={s.name}>
                <ListItemText
                  primary={s.name}
                  secondary={<MarkdownView markdown={s.content} components={shortcodesWithProps} />}
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
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }}
    >
      {cells.map((cell, index) => (
        <TableCell
          key={cell}
          sx={{
            textTransform: textTransform || 'none',
          }}
        >
          <Box component="span">{cell}</Box>
          {(button && index > 0) ? <Dice disableText r={`d20${cell}`} /> : ''}
        </TableCell>
      ))}
    </TableRow>
  );
}

function SearchResultItemContentSpell({ spell, page }) {
  return (
    <>
      <SpellStats
        castingTime={spell.castingtime}
        range={spell.range}
        components={spell.components}
        duration={spell.duration}
        attackSave={spell.attacksave}
        page={page}
      />
      <MarkdownView markdown={spell.description} />
    </>
  );
}

function SpellStats({
  castingTime, range, components, duration, attackSave, page,
}) {
  const spellStatIcons = [<WatchLater />, <SocialDistance />, <Extension />, <WatchLater />, <DmcmAttackIcon width="24" fill="white" />];
  return (
    <List
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        typography: 'body1',
      }}
      dense
    >
      {[castingTime, range, components, duration, attackSave].map((stat, index) => (
        <ListItem
          key={page.stats.spells[index]}
          sx={{
            flex: '1 1 50%',
          }}
        >
          <ListItemIcon>
            {// Put a tooltip on the "Components" stat icon.
            index === 2 ? (
              <Tooltip title="Verbal (V), Somatic (S), or Material (M)">
                {spellStatIcons[index]}
              </Tooltip>
            ) : spellStatIcons[index]
            }
          </ListItemIcon>
          <ListItemText
            primary={page.stats.spells[index]}
            secondaryTypographyProps={{
              component: 'div',
              variant: 'body2',
            }}
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
*/ }

export default Search;
