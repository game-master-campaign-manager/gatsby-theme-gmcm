import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CasinoIcon from '@mui/icons-material/Casino';
import { useSnackbar, SnackbarContent } from 'notistack';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { Button } from 'gatsby-theme-material-ui';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const SnackAttack = React.forwardRef(({
  id, n, h, d, monster,
}, ref) => {
  const { closeSnackbar } = useSnackbar();
  console.log(monster);
  return (
    <SnackbarContent ref={ref}>
      <Card sx={{ backgroundColor: 'secondary.main', color: 'black' }}>
        <CardActions>
          <Typography sx={{ fontWeight: 'bold' }}>
            {monster}
            {n}
          </Typography>
          <Typography component="p" variant="overline" sx={{ fontStyle: 'italic', lineHeight: '2' }}>
            to Hit:
            <Box component="span" sx={{ typography: 'body1', fontStyle: 'normal', ml: 1 }}>{h}</Box>
          </Typography>
          <Typography component="p" variant="overline" sx={{ fontStyle: 'italic', lineHeight: '2' }}>
            Damage:
            <Box component="span" sx={{ typography: 'body1', fontStyle: 'normal', ml: 1 }}>{d}</Box>
          </Typography>
          <IconButton onClick={() => closeSnackbar(id)}>
            <CloseIcon sx={{ color: 'black' }} />
          </IconButton>
        </CardActions>
      </Card>
    </SnackbarContent>
  );
});

export function Attack({
  n = '', h, d, monster = '',
}) {
  const { enqueueSnackbar } = useSnackbar();
  console.log(monster);
  return (
    <Button onClick={() => {
      const hRoll = new DiceRoll(h);
      const dRoll = new DiceRoll(d);
      enqueueSnackbar(
        null,
        {
          persist: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          content: (key) => <SnackAttack id={key} n={n} h={hRoll.total} d={dRoll.total} monster={monster} />,
        },
      );
    }}
    >
      hi
    </Button>
  );
}

export function Dice({
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
