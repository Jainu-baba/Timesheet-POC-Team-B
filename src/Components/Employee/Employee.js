import React from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';



import { useState } from 'react';
import { Grid } from '@mui/material';
import TimeSheet from './TimeSheet';
import TimeSheetEntry from './TimeSheetEntry';
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function Employee() {
  if(window.location.href.split("/").includes("employee")) {
    localStorage.setItem("role", 'employee');
  }
  

  return (
    <div className='time-sheet-box'>
      {/* <TimeSheet /> */}
      <TimeSheetEntry />
      
    </div>
  );
}



