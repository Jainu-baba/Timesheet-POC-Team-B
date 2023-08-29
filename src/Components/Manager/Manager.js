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
      renderCell: (params) => {
        return (

          <Button onClick={(e) => detailView()}><RemoveRedEyeIcon /></Button>
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
  const detailView = () => {
    naviagate("/details")

  }
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toastOpen, settoastOpen] = React.useState(false);
  const [rejectoast, setrejectoast] = React.useState(false);
  const [disableButtons, setdisableButtons] = React.useState(true);


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
    rows = newRows

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
    rows = Rows

  }
  var vertical = "top";
  var horizontal = "center";
  useEffect(() => {
   
    const data = JSON.parse(localStorage.getItem('EmployeesData'));
    data.forEach((e, i )=> {
      let strinfy = JSON.parse(e);
      console.log(strinfy);
      console.log(Object.values(Object.values(strinfy)[0]));
      let arrayData = Object.values(Object.values(strinfy)[0]);
      rows = arrayData[0].map((obj, index) => {obj["id"] = index;obj["empName"] = Object.keys(strinfy)[0]; return obj} );
      var formData = {name: Object.keys(strinfy)[0], date: Object.keys(Object.values(strinfy)[0])[0],

      }
    })
    console.log("data", data);
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
          <select disabled className="select">
            <option value="">31-07-2023 - 07-08-2023</option>
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
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}

            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id),
              );

              setSelectedRows(selectedRows);
              setdisableButtons(((selectedRows.length > 0) ? false : true));
            }}
            pageSizeOptions={[5]}

            disableRowSelectionOnClick
          />
          <pre style={{ fontSize: 10 }}>
            {JSON.stringify(selectedRows, null, 4)}
          </pre>

        </Box>
      </div>
    </div>
  )
}



export default Manager;