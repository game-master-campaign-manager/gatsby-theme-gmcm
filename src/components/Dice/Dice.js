import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import CasinoIcon from '@mui/icons-material/Casino';
import { useSnackbar, SnackbarContent } from 'notistack';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { Button } from 'gatsby-theme-material-ui';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/styles';
import diceStrings from './diceStrings';

const SnackAttack = React.forwardRef(({
  id, n, h, d, damageObj, monster, backgroundColor,
}, ref) => {
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = React.useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);
  const damages = damageObj.rolls.map((x) => x.value && x.value);
  console.log(damages);
  return (
    <SnackbarContent ref={ref}>
      <Card sx={{ backgroundColor, color: 'black' }}>
        <CardActions>
          <Typography sx={{ fontWeight: 'bold' }}>{`${monster}: ${n}`}</Typography>
          <Typography component="p" variant="overline" sx={{ fontStyle: 'italic', lineHeight: '2' }}>
            {diceStrings.snackAttack.toHit}
            :
            <Box component="span" sx={{ typography: 'body1', fontStyle: 'normal', ml: 1 }}>{h}</Box>
          </Typography>
          <Typography component="p" variant="overline" sx={{ fontStyle: 'italic', lineHeight: '2' }}>
            {diceStrings.snackAttack.damage}
            :
            <Box component="span" sx={{ typography: 'body1', fontStyle: 'normal', ml: 1 }}>{d}</Box>
          </Typography>
          <Box>
            <IconButton
              aria-label="Show more"
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
            <IconButton onClick={() => closeSnackbar(id)}>
              <CloseIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper square sx={{ p: 1 }}>
            <Typography>PDF ready</Typography>
          </Paper>
        </Collapse>
      </Card>
    </SnackbarContent>
  );
});

export function Attack({
  n = '', h, d, monster = '',
}) {
  const safeH = h.charAt(0) === '+' ? `1d20+${h.charAt(1)}` : h;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      onClick={() => {
        const hRoll = new DiceRoll(safeH);
        let dRoll = new DiceRoll(d);
        let backgroundColor = theme.palette.secondary.main;
        // Critical Hit: all dice are doubled.
        if (hRoll.rolls[0].value === 20) {
          backgroundColor = theme.palette.success.main;
          const secondRoll = new DiceRoll(d);
          dRoll = { total: secondRoll.total + dRoll.total - dRoll.rolls[2] };
        }
        // Critical Miss: no damage.
        if (hRoll.rolls[0].value === 1) {
          backgroundColor = theme.palette.error.main;
          dRoll = { total: 0 };
        }
        enqueueSnackbar(
          null,
          {
            persist: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            content: (key) => (
              <SnackAttack
                id={key}
                n={n}
                h={hRoll.total}
                d={dRoll.total}
                damageObj={dRoll}
                monster={monster}
                backgroundColor={backgroundColor}
              />
            ),
          },
        );
      }}
    >
      {n}
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
