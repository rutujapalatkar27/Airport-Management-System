import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { Box, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { checkEmptyFields } from '../../services/formValidationService';
import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { fetchTerminalDetailsService } from '../../services/terminalService';
import { addTerminalService } from '../../services/terminalService';

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,

    height: "100vh"
  }
};


const TerminalForm = () => {
     // need to get from user context
  const authContext = useContext(AuthContext);
  const {userDetails} = authContext;
   const {id} = userDetails;
   const [terminalState, setTerminalState] = useState({terminal:"",status:"",airport: sessionStorage.getItem("airport")});
  const [loading, setLoading] = useState(false);
  const params = useParams();
   const {id: terminal_id} = params;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if(terminal_id != undefined){
      fetchTerminalDetails(terminal_id);
    }
  }, [])

  const fetchTerminalDetails = async (terminal_id) => {
    setLoading(true);
    const serviceResponse = await fetchTerminalDetailsService(terminal_id);
    if (serviceResponse.status === 200) {
      setTerminalState(serviceResponse.data.payload[0]);
      setLoading(false);
  }
    else {
      setOpen(true);
      setMessage('Some Error Occured while fetching data');
    }
  }

  const handleFormChange = (e) => {
    
    setTerminalState({
      ...terminalState,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    setTerminalState({
      ...terminalState,
    });

    if (checkEmptyFields(terminalState) === true) {
      const serviceResponse = await addTerminalService(terminalState);
      if (serviceResponse.status === 200) {
        setOpen(true);
        setMessage('Operation Successfull');
        setTimeout(() => { navigate('/airport-gates'); }, 2500)

      }
      else {
        setOpen(true);
        setMessage('Error Occured :' + serviceResponse.data.message);
      }
    }
    else {
      setOpen(true);
      setMessage('Please Fill out all the fields');
    }


  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <React.Fragment>
      <Paper style={styles.paperContainer}>
        {/* </Paper> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
      {loading ? (
        <CircularProgress color="success" />

      ) : (

        <>
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "#21b6ae"}}>
            <Card variant="outlined" sx={{width: '80%'}}>
              <CardHeader title="TerminalDetails">

              </CardHeader>
              <CardContent>
                <Stack spacing={3}>
                <TextField
                  id="terminal_number"
                  name="terminal"
                  label="Number"
                  fullWidth
                  autoComplete="Source"
                  variant="standard"
                  onChange={handleFormChange}
                  value={terminalState.terminal}
                  backgroundcolor="#21b6ae"
                />
                <Box sx={{ minWidth: 120, maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name='status'
                      id="demo-simple-select"
                      value={terminalState.status}
                      label="Status"
                      onChange={handleFormChange}
                    >
                      <MenuItem value={'active'}>Active</MenuItem>
                      <MenuItem value={'inactive'}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                </Stack>
              </CardContent>
              <CardActions style={{justifyContent:'center'}}>
                <Button style={{backgroundColor: "#21b6ae"}} variant={'contained'} onClick={handleSubmit}>Submit</Button>
              </CardActions>
            </Card>
          </div>
          <Button style={{marginTop: '10px',  backgroundColor: "#21b6ae", margin: "10px"}}variant={'contained'} onClick={() => {navigate(-1)}}>Go Back</Button>
        </>


      )}

     </Paper>
    </React.Fragment>);

}

export default TerminalForm