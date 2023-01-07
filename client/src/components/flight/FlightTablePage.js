import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { fetchFlightListService } from '../../services/flightService';
import FlightTable from './FlightTable';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';



const FlightTablePage = ({status})  => {

  const [intervalState, setIntervalState] = useState(1);
  const [flightListState, setFlightListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpen(false);
  }

  const redirectToDashboard = () => {
    navigate("/dashboard")
  }

  const handleIntervalChange = (e) => {
    setIntervalState(e.target.value);
  }

  useEffect(() => {
    fetchFlightListData();
  }, [intervalState]);

  const fetchFlightListData = async () => {
    const serviceResponse = await fetchFlightListService({interval: intervalState, status});
    if (serviceResponse.status === 200) {
      setFlightListState(serviceResponse.data.payload);
      setLoading(false);
    }
    else {
      setOpen(true);
      setMessage('Some error occured while fetching data');
    }
  }
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
      />
      <div style={{color: "white", backgroundColor: "#48C9B0"}}>
        <h1>Flight List</h1>
      </div>
      {loading ? 
        (
          <CircularProgress color="success" />
        ) :
        (
          <div>
            <div style={{padding: "25px"}}>
            <Box sx={{ minWidth: 120, maxWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={intervalState}
                  label="Time Interval"
                  onChange={handleIntervalChange}
                >
                  <MenuItem value={1}>1 hour</MenuItem>
                  <MenuItem value={2}>2 hours</MenuItem>
                  <MenuItem value={4}>4 hours</MenuItem>
                </Select>
              </FormControl>
            </Box>
            </div>
            <FlightTable flightListState={flightListState} update={false}/>
          </div>
        )
      }
      <br></br>
      <div style={{justifyContent: 'center'}}>
        <Button variant="contained" onClick={redirectToDashboard}>
          Back to Dashboard
        </Button>
      </div>
    </React.Fragment>
  );
}

export default FlightTablePage;


{/* <Paper elevation={3}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell align="right">Ariline</TableCell>
                    <TableCell align="right">Flight Number</TableCell>
                    <TableCell align="right">Time of Arrival</TableCell>
                    <TableCell align="right">Terminal</TableCell>
                    <TableCell align="right">Gate</TableCell>
                    <TableCell align="right">Baggage Claim</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {flightListState.map((row) => (
                    <TableRow
                      key={flight_number}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {source}
                      </TableCell>
                      <TableCell align="right">{row.airline}</TableCell>
                      <TableCell align="right">{row.flight_number}</TableCell>
                      <TableCell align="right">{row.time_of_flight}</TableCell>
                      <TableCell align="right">{"A"}</TableCell>
                      <TableCell align="right">{"B"}</TableCell>
                      <TableCell align="right">{"C"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Paper> */}