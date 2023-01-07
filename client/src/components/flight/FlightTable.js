import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatDate } from '../../services/dateService';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const FlightTable = ({flightListState,update,bagAssign}) => {
  const navigate = useNavigate();
  const handleUpdate = (row) => {
    setTimeout(() => {
      navigate(`/flight/update/${row.id}`);
    }, 2000);
  }

  return(
      <Paper elevation={3}>
        {flightListState.length > 0 ? (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell align="right">Airline</TableCell>
                  <TableCell align="right">Flight Number</TableCell>
                  <TableCell align="right">Time of Flight</TableCell>
                  <TableCell align="right">Terminal</TableCell>
                  <TableCell align="right">Gate</TableCell>
                  <TableCell align="right">Baggage Claim</TableCell>
                  {update | bagAssign && (<TableCell align="right">Action</TableCell>)}
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {flightListState.map((row) => (
                  <TableRow
                    key={row.flight_number}
                    sx={{'&:nth-of-type(odd)': {
                      backgroundColor: "#E8F8F5",
                    }, '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.source}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.destination}
                    </TableCell>
                    <TableCell align="right">{row.airline}</TableCell>
                    <TableCell align="right">{row.flight_number}</TableCell>
                    <TableCell align="right">{formatDate(new Date(row.time_of_flight))}</TableCell>
                    <TableCell align="right">{row.terminal}</TableCell>
                    <TableCell align="right">{row.gate}</TableCell>
                    <TableCell align="right">{row.bagCarousel? row.bagCarousel: "Not Assigned"}</TableCell>
                    {update && (<TableCell align="right">
                      <Button
                        onClick={() => {handleUpdate(row)}}
                      >
                        Update
                      </Button>
                    </TableCell>)}
                    {bagAssign && (<TableCell align="right">
                      <Button
                        onClick={() => {handleUpdate(row)}}
                      >
                        Assign Baggage
                      </Button>
                    </TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ): (
          <h1 style={{padding: '25px'}}>No Flights</h1>
        )}
          
      </Paper>
  )

}

export default FlightTable;
