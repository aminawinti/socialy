import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import classes from './LoadingBox.module.css';

export default function LoadingBox(props) {
  return (
    <Box className={classes.loading}>
      <CircularProgress className={classes.label} />
      {props.children}
    </Box>
  );
}
