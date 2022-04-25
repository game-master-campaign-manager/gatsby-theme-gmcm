import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PublicIcon from '@mui/icons-material/Public';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import {
  SETTING, PLAYERS, LEVELS,
} from '../utils/constants';

function AdventureDetails({
  levels, players, setting, body, direction,
}) {
  return (
    <Stack direction={direction || 'column'}>
      <AdventureStats setting={setting} levels={levels} players={players} />
      <AdventureDescription body={body} />
    </Stack>
  );
}

function AdventureStats({ setting, levels, players }) {
  const statTitles = [SETTING, LEVELS, PLAYERS];
  const statIcons = [<PublicIcon />, <SwitchAccessShortcutIcon />, <SupervisedUserCircleIcon />];
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 1,
        backgroundColor: 'secondary.main',
      }}
    >
      {[setting, levels, players].map((stat, index) => (stat ? (
        <Tooltip key={statTitles[index]} title={statTitles[index]}>
          <Chip
            icon={statIcons[index]}
            label={stat}
            color="primary"
            sx={{
              boxShadow: 2,
            }}
          />
        </Tooltip>
      ) : null))}
    </Stack>
  );
}

function AdventureDescription({ body }) {
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </Box>
  );
}

export default AdventureDetails;
