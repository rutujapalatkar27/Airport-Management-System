import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { fetchTerminalListService } from '../../services/terminalService';
import GateTable from './GateTable';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import BgImage from '../../img/airport_terminal.jpg';

  

const AirportGates = () => {
    const [selectedTerminal, setSelectedTerminal] = useState(1);
    const [terminalListState, setTerminalListState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  

    const handleTerminalChange = (e) => {
        setSelectedTerminal(e.target.value);
      }
      useEffect(() => {
        fetchTerminalListData();
      }, []);

      const redirectToTerminalForm = (terminal_id) => {
        navigate(`/terminal/${terminal_id}`);
      }

      const redirectToGateForm = (terminal_id) => {
        navigate(`/gate/${terminal_id}`);
      }
    
    
      const fetchTerminalListData = async () => {
        const serviceResponse = await fetchTerminalListService();
        if (serviceResponse.status === 200) {
          setTerminalListState(serviceResponse.data.payload);
          setLoading(false);
          setSelectedTerminal(serviceResponse.data.payload[0]);
          sessionStorage.setItem("airport",serviceResponse.data.payload[0].airport);
        }
        else {
          setOpen(true);
          setMessage('Some error occured while fetching data');
          sessionStorage.removeItem("airport");
        }
      }

      
      const handleClose = () => {
        setOpen(false);
      }
      
    return (
        <React.Fragment>
        { <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        /> }
          <h1 style={{margin:"0px"}}>Gate List</h1>
        {loading ? 
          (
            <CircularProgress color="success" />
          ) :
          (

            <div>
              {/* <img src={BgImage} alt={"Airport Terminal"}></img> */}
              <div>
            <div>
              <Button
              style={{ marginBottom: "5px",  marginTop: "5px"  }}
               onClick={() => redirectToTerminalForm('new')}
              variant={'contained'}
              color={'primary'}
            >
              Add Terminal
            </Button>
            </div>
              <div style={{padding: "25px"}}>
              <Box sx={{ minWidth: 120, maxWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Airport Terminals</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTerminal}
                    label="Airport Terminal"
                    onChange={handleTerminalChange}
                  >
                    {terminalListState.map((row)=>(
                    <MenuItem key={row.terminal} value={row}>Terminal {row.terminal}</MenuItem>                      
                    ))}
                    {/* <MenuItem value={2}>Terminal 2</MenuItem>
                    <MenuItem value={3}>Terminal 3</MenuItem> */}
                  </Select>
                  <Button
              style={{ marginBottom: "5px",  marginTop: "5px"  }}
                onClick={() => redirectToTerminalForm(selectedTerminal.id)}
              variant={'contained'}
              color={'primary'}
            >
              Update Terminal
            </Button>
            {selectedTerminal.status == "inactive"?(<span color='red' style={{display:"flex", color:"red"}}>
              <InfoIcon color='red'></InfoIcon><p>Inactive Terminal</p></span>
):("")}
                </FormControl>
              </Box>
              </div>
              </div>
              <GateTable currentTerminal={selectedTerminal}/>
              <div style={{display:"block"}}>
              <Button
              style={{ marginBottom: "5px",  marginTop: "5px"  }}
              onClick={() => redirectToGateForm(selectedTerminal.id)}
              variant={'contained'}
              color={'primary'}
              disabled={selectedTerminal.status=="inactive"}
            >
              Add Gate
            </Button>
            <br></br>
            <Button style={{marginTop: '10px',  backgroundColor: "#21b6ae", margin: "10px"}}variant={'contained'} onClick={() => {navigate(`/airport-dashboard`)}}>Go Back</Button>
            </div>
            </div>
          )
        }
        
      </React.Fragment>
    );
};

export default AirportGates;