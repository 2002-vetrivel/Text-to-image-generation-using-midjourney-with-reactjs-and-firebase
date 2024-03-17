import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
     <img className="Loading" src="/three.gif" alt="animation"/>
    </Box>
  );
}
