import React from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import DateRange from './DateRange.json';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function TimeSheet() {
    

    const [selectedRange, setSelectedRange] = useState(null);
    const [dateRanges, setDateRanges] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    useEffect(() => {
        setDateRanges(DateRange);
        setSelectedRange(dateRanges[0]);
        setSelectedDates(dateRanges[0]?.dates)
    }, []);

    const handleEmployee = (empName) => {      
        localStorage.setItem('employeeName', empName);
        localStorage.setItem(empName, '');
    }

    const submitData = () => {
        const empName = localStorage.getItem('employeeName');
        const empData = localStorage.getItem('empData');
        console.log(JSON.parse(empData));
        handleClickOpen();
    }


    const handleDropdownChange = (event) => {
        const selectedIndex = event.target.value;
        setSelectedRange(dateRanges[selectedIndex]);
        setSelectedDates(dateRanges[selectedIndex].dates);        
        const edata = dateRanges[selectedIndex].fromDate+'-'+dateRanges[selectedIndex].toDate;
        localStorage.setItem('dateRange', edata);
        const empName = localStorage.getItem('employeeName');
        let empData = localStorage.getItem(empName);
        empData = {[edata]: []}; 
        localStorage.setItem(empName, JSON.stringify(empData));
    
    };
    return (
        <>
        <Grid container spacing={4}  className='mb-20'>
            <Grid item xs>
                <select className='entry-selectbox' onChange={(event) => handleEmployee(event.target.value)}>
                    <option>Employee Name</option>
                    <option>Bhargavi</option>
                    <option>Karthik</option>
                    <option>Ejaz</option>
                    <option>Rakesh</option>
                    <option>Jainu</option>
                </select>
            </Grid>
            <Grid item xs={8}>
                <select className='entry-selectbox' onChange={handleDropdownChange}>
                    <option value={null}>Select a date range</option>
                    {dateRanges.map((range, index) => (
                        <option key={index} value={index}>
                            {range.fromDate} - {range.toDate}
                        </option>
                    ))}
                </select>               
            </Grid>
            <Grid item xs>         
             <button onClick={submitData} className='timesheet-button'>submit</button> 
            </Grid>          
        </Grid>

        <Grid container spacing={3} className='mb-20'>
                    <Grid item xs={4}>
                        <Grid container spacing={3}>
                            <Grid item>
                                <div className="rs-btn-disabled">Project Code</div>
                            </Grid>
                            <Grid item>
                            <div className="rs-btn-disabled">Job Code</div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            {selectedDates && selectedDates.length > 0 && selectedDates.map((date) => {
                            return <Grid item>
                                <div className="rs-btn-disabled w-30">{date}</div>
                            </Grid>
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                            <div className="rs-btn-disabled w-50">total</div>
                    </Grid>
                </Grid>



                <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Data Saved Successfully!
          </DialogContentText>
        </DialogContent>
      </Dialog>

        </>
    );
}



