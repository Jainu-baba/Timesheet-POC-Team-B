import React from 'react'
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import DateRange from './DateRange.json';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





var rows = [
  { id: 1, jobCode: "Testing", empName: "jain", projectCode: 'WFS_1101',  total: 35, ViewDetails: "", Comments: "" },
 
];



const trigger = (row, e) => {
  rows.map(obj => {
    if (obj.id === row.id) {
      obj.Comments = e.target.value; return obj
    }

  });
}

const Manager = () => {
  localStorage.setItem("role", 'manager');
  const columns = [
    { field: 'id', headerName: 'Emp code', width: 90 },
    { field: 'jobCode', headerName: 'job Code', width: 90 },
    {
      field: 'empName',
      headerName: 'Emp Name',
      width: 150,
      editable: true,
    },
    {
      field: 'projectCode',
      headerName: 'Project Code',
      width: 150,
      editable: true,
    },
    {
      field: 'total',
      headerName: 'Total Hours',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'ViewDetails',
      headerName: 'View Details',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderCell: (param) => {
        return (

          <Button onClick={(e) => detailView(param)}><RemoveRedEyeIcon /></Button>
        );
      }
    },
    {
      field: 'Comments',
      headerName: 'Comments',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderCell: (params) => {
        return (

          <input type="text" style={{width: "100%"}} onChange={(e, i) => trigger(params, e)} />
          
        );
      }
    },
  ];
  const naviagate = useNavigate();
  const detailView = (param) => {
    localStorage.setItem("details", param.row.id);
    naviagate(`/details/${param.row.empName}`);

  }
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rowsData, setrowsData] = React.useState(rows);
  const [toastOpen, settoastOpen] = React.useState(false);
  const [rejectoast, setrejectoast] = React.useState(false);
  const [disableButtons, setdisableButtons] = React.useState(true);
  const [selectedDates, setselectedDates] = React.useState("");


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    settoastOpen(false);
    setrejectoast(false);
  };
  const apply = () => {
    var newRows = [];
    settoastOpen(true);
    rows.forEach((row, i) => {
      selectedRows.forEach((e, id) => {

        if(e.id !== row.id) {
          newRows.push(e);
        }
       
      }
       )
    } 
    
    );
    setrowsData(newRows);
   // rowsData = newRows

  }

  const reject = () => {
    var Rows = [];
    setrejectoast(true);
    rows.forEach((row, i) => {
      selectedRows.forEach((e, id) => {

        if(e.id !== row.id) {
          Rows.push(e);
        }
       
      }
       )
    } 
    
    );
    setrowsData(Rows);
    //rowsData = Rows

  }
  var vertical = "top";
  var horizontal = "center";
  useEffect(() => {
   
    const data = JSON.parse(localStorage.getItem('EmployeesData'));
    data.forEach((e, i )=> {
      let strinfy = JSON.parse(e);    
      setselectedDates(Object.keys(Object.values(strinfy)[0])[0]);  
      let arrayData = Object.values(Object.values(strinfy)[0]);
     let rowsArray = arrayData[0].map((obj, index) => {obj["id"] = index;obj["empName"] = Object.keys(strinfy)[0]; return obj} );
     if(localStorage.getItem("approved") === "true") {
      let removeItem = localStorage.getItem("details");

    let sorted =   rowsArray.filter((e, i) => e.id !== Number(removeItem));
      setrowsData(sorted); 
     } else {
      setrowsData(rowsArray);
     }
          
    })  
}, []);
  return (

    <div className="overall-layout">
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={toastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Approved {selectedRows.map(e => e.EmpName).toString()}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={rejectoast} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Rejected {selectedRows.map(e => e.EmpName).toString()}
        </Alert>
      </Snackbar>

      <div className="wrapper">
        <div className="align-header">
          <select disabled className="select" value={selectedDates}>
            <option value="">{selectedDates}</option>
          </select>
        </div>
        <div className="align-buttons">
          <div>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" disabled={disableButtons} color="success" onClick={apply}>Approve</Button>
              <Button variant="contained" disabled={disableButtons} color="error" onClick={reject}>Reject</Button>
            </Stack>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            checkboxSelection
            rows={rowsData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}

            onRowSelectionModelChange={(ids) => {
              const newIds = ids.map(e => e +1);
              const selectedIDs = new Set(newIds);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id),
              );

              setSelectedRows(selectedRows);
              setdisableButtons(((selectedRows.length > 0) ? false : true));
            }}
            pageSizeOptions={[5]}

            disableRowSelectionOnClick
          />
         

        </Box>
      </div>
    </div>
  )
}



export default Manager;