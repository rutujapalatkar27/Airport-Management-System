import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { fetchGateListService,fetchGateListForTerminalService,addGateService } from '../../services/gateService';
import { useNavigate } from 'react-router-dom';


const GateTable = ({currentTerminal}) => {

  // const [selectedTerminal, setSelectedTerminal] = useState(1);
  const [gateListState, setGateListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  // const handleTerminalChange = (e) => {
  //     setSelectedTerminal(e.target.value);
  //   }
    useEffect(() => {
      fetchGateListData();
    }, [currentTerminal]);
  
    const fetchGateListData = async () => {
      const serviceResponse = await fetchGateListService();
      if (serviceResponse.status === 200) {
        setGateListState(serviceResponse.data.payload);
        console.log("gatelist",gateListState);
        setLoading(false);
      }
      else {
        setOpen(true);
        setMessage('Some error occured while fetching data');
      }
    }

    const handleGateDisable = async(gate) => {
      const currentGate = {...gate, status : "disabled"} ;
      const serviceResponse = await addGateService(currentGate);
      if (serviceResponse.status === 200) {
        setOpen(true);
        setMessage('Operation Successfull');
        gate.status="disabled";
        // setTimeout(() => { navigate('/airport-gates'); }, 2500)

      }
      else {
        setOpen(true);
        setMessage('Some Error Occured while disabling gate');
      }
    }

    const handleGateEnable = async(gate) => {
      const currentGate = {...gate, status : "available"} ;
      const serviceResponse = await addGateService(currentGate);
      if (serviceResponse.status === 200) {
        setOpen(true);
        setMessage('Operation Successfull');
        gate.status="available";
        // setTimeout(() => { navigate('/airport-gates'); }, 2500)

      }
      else {
        setOpen(true);
        setMessage('Some Error Occured while enabling gate');
      }
    }
    
  const handleClose = () => {
    setOpen(false);
  }
    return (
      <React.Fragment>
<Paper elevation={3}>
<Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
  { 
    gateListState.filter((row)=>row.terminal == currentTerminal.id).length>0?(
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Gate</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gateListState.filter((row)=>(row.terminal == currentTerminal.id)).map((row) => (
                    <TableRow
                      key={row.gate}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">{row.gate}</TableCell>
                      <TableCell align="center">{row.status == "disabled"? "Under Maintenance" : row.status}</TableCell>
                      <TableCell >{(row.status == "disabled")?(<Button
                                    style={{ marginBottom: "10px",  marginTop: "10px"  }}
                                    variant={'contained'}
                                    color={'secondary'}
                                    disabled={ currentTerminal.status=="inactive"}
                                    onClick={()=> handleGateEnable(row)}
                                >Enable
                                </Button>):(<Button
                                    style={{ marginBottom: "10px",  marginTop: "10px"  }}
                                    variant={'contained'}
                                    color={'secondary'}
                                    disabled={row.status=="inuse" }
                                    onClick={()=> handleGateDisable(row)}
                                >Disable
                                </Button>)}
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
 ):((
  <h1 style={{padding: '25px'}}>No Gates</h1>
))} </Paper></React.Fragment>
    );
};

export default GateTable;