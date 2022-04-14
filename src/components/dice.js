import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { useSnackbar } from 'notistack';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { Button } from 'gatsby-theme-material-ui';

function Dice({
  r, variant, ability, value, modifier, disableText,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [log] = React.useState([]);

  const handleClick = () => {
    const roll = new DiceRoll(r);
    log.push(roll);
    enqueueSnackbar(roll.output);
  };

  if (variant) {
    return (
      <Button
        onClick={handleClick}
        sx={{
          '& span': {
            display: 'block',
            lineHeight: 1,
          },
          display: 'flex !important',
          flexDirection: 'column',
          flex: '1 1 0',
        }}
      >
        <Box
          component="span"
          sx={{ typography: 'h5', fontWeight: 700 }}
        >
          {value}
        </Box>
        <Box sx={{ my: 0.5, lineHeight: 1 }}>{modifier > 0 ? `+${modifier}` : modifier}</Box>
        <Box sx={{ fontWeight: 700 }}>{ability}</Box>
      </Button>
    );
  }

  return (
    <Tooltip title={r} color="primary.main">
      <>
        {!disableText && r }
        <IconButton
          edge="end"
          aria-label="Roll Dice"
          onClick={handleClick}
          sx={{
            mr: '-5px',
            mt: '-8px',
            position: 'relative',
            top: '2px',
          }}
        >
          <CasinoIcon />
        </IconButton>
      </>
    </Tooltip>
  );
}

export default Dice;
