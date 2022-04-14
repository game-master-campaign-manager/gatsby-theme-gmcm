import React from 'react';
import {
  ArrowDownward,
  ArrowUpward,
  Info,
  Map,
  WatchLater,
  SocialDistance,
  Extension,
} from '@mui/icons-material';
import DmcmDamageIcon from '../images/exploding-planet.svg';
import DmcmAttackIcon from '../images/bullseye.svg';

// NEW NEW CONSTANTS (CHECK IMPORTS AGAIN)
// Universals
export const SCROLL_MARGIN_TOP = '8rem'; // delete this.
export const CARD_HEADER_STYLES = {
  textTransform: 'capitalize',
  typography: 'h5',
};
export const SCROLL_BEHAVIOR = {
  behavior: 'smooth',
  block: 'start',
};
// Location Page
export const MAP = 'map';
export const GENERAL = 'general information';
export const UP = 'up';
export const DOWN = 'down';
export const UNKNOWN_FLAG = 'The flag listed in this location\'s frontmatter is unrecognized.';
export const FLAG_TOOLTIPS = {
  person: 'A person of interest is here.',
  monster: 'Monster(s) present here.',
  secret: 'There are hidden passages or items here.',
  eyes: 'Players can/are being observed here.',
  treasure: 'There is loot here.',
  trap: 'There is a trap here.',
  boss: 'A boss level monster is here.',
};
// END NEW NEW CONSTANTS

export const SPELL_STAT_ICONS = [<WatchLater />, <SocialDistance />, <Extension />, <WatchLater />, <DmcmAttackIcon width="24" fill="white" />, <DmcmDamageIcon width="24" fill="White" />];
export const SITE_NAME = 'Game Master\'s Campaign Manager';
export const SITE_SHORT_NAME = 'GMCM';
export const FOOTER_COPY = `${SITE_NAME} © ${new Date().getFullYear()} J. Garrett Vorbeck`;
export const NAVIGATION_DATA = [
  {
    title: 'adventures',
    slug: '/adventures',
  },
  {
    title: 'bestiary',
    slug: '/search/?category=monsters',
  },
  {
    title: 'reference',
    slug: '/reference',
  },
  {
    title: 'spellbook',
    slug: '/search/?category=spells',
  },
];
export const SETTING = 'Setting';
export const PLAYERS = 'Players';
export const LEVELS = 'Levels';
export const HEADER_CELLS = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'race',
    numeric: false,
    label: 'Race',
  },
  {
    id: 'location',
    numeric: false,
    label: 'Location',
  },
  {
    id: 'occupation',
    numeric: false,
    label: 'Job',
  },
  {
    id: 'age',
    numeric: true,
    label: 'Age',
  },
  {
    id: 'stats',
    numeric: false,
    label: 'Stats',
  },
  {
    id: 'emotion',
    numeric: false,
    label: 'Emotion',
  },
  {
    id: 'motive',
    numeric: false,
    label: 'Motive',
  },
  {
    id: 'voice',
    numeric: false,
    label: 'Voice',
  },
];
export const GREETING = 'Hail fellow well met.';
export const DESCRIPTION = 'The GMCM is a React-based campaign manager for your favorite 5E TTRPG.';
export const ADVENTURES = 'Adventures';
export const NPCS = 'NPCs';
export const LOCATIONS = 'Locations';
export const LOCATION_NAVIGATION = [
  {
    name: 'Map',
    anchor: 'map',
    icon: <Map />,
  },
  {
    name: 'General Info',
    anchor: 'general',
    icon: <Info />,
  },
  {
    name: 'Up',
    anchor: 'up',
    icon: <ArrowUpward />,
  },
  {
    name: 'Down',
    anchor: 'down',
    icon: <ArrowDownward />,
  },
];
export const GENERAL_INFORMATION = 'General Information';

export const REFERENCE = 'Reference';
export const BESTIARY = 'Bestiary';
export const SPELLBOOK = 'Spellbook';
export const UNKNOWN_SEARCH_TYPE = 'category url param missing';
export const LIFE_STAT_NAMES = ['Armor Class', 'Hit Points'];
// export const TABLE_STAT_NAMES = ['Speed', 'Saving Throws', 'Skills', 'Senses'];
export const TABLE_STAT_NAMES = [
  {
    title: 'Speed',
    columns: ['Type', 'Distance'],
  },
  {
    title: 'Saving Throws',
    columns: ['Ability', 'Modifier'],
  },
  {
    title: 'Skills',
    columns: ['Skill', 'Modifier'],
  },
  {
    title: 'Senses',
    columns: ['Sense', 'Sensitivity'],
  },
];
export const SIMPLE_STAT_NAMES = ['Damage Vulnerabilities', 'Damage Resistances', 'Damage Immunities', 'Condition Immunities', 'Languages', 'Challenge'];
export const INFO_STAT_NAMES = ['Traits', 'Actions', 'Reactions', 'Legendary Actions'];
export const SPELL_STAT_NAMES = ['Casting Time', 'Range', 'Components', 'Duration', 'Attack/Save', 'Damage'];
export const BLOCK_HEADER_STYLES = {
  backgroundColor: 'primary.main',
  padding: 1,
  color: 'common.white',
};
export const SPELL_LEVEL_LABEL = 'Level';
export const RITUAL_EXPLAINER = 'A ritual spell can be cast following the normal rules for spellcasting, or the spell can be cast as a ritual. The ritual version of a spell takes 10 minutes longer to cast than normal. It also doesn’t expend a spell slot, which means the ritual version of a spell can’t be cast at a higher level.';
