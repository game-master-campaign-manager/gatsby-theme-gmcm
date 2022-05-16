import React from 'react';
// import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';
import { DEFAULT_DIALER_ACTIONS } from '../../utils/constants';

// const actions = [
//   { icon: <FileCopyIcon />, name: 'Copy' },
//   { icon: <SaveIcon />, name: 'Save' },
//   { icon: <PrintIcon />, name: 'Print' },
//   { icon: <ShareIcon />, name: 'Share' },
// ];

function Dialer({ dialerActions = '' }) {
  const actions = [...DEFAULT_DIALER_ACTIONS];
  console.log(actions);
  dialerActions && dialerActions.forEach((action) => {
    actions.push(action);
  });
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: 'sticky', bottom: 16, right: 16, alignItems: 'flex-end',
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}

export default Dialer;
