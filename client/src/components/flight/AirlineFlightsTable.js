

import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { CardHeader } from '@mui/material';
import { checkEmptyFields } from '../../services/formValidationService';
import { Paper } from '@mui/material';
import { addFlightService, fetchFlightListForAirlineService } from '../../services/flightService';
import FlightTable from './FlightTable';
import { AuthContext } from '../../contexts/AuthContextProvider';

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,

    height: "100vh"
  }
};


const ArilineFlightsTable = () => {


  const [flightListState, setFlightListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { authLoadingState, userDetails } = authContext;
  const {role_id} = userDetails;

  const getFlightListForCurrentAirline = async () => {
    //Need to get airline id based on user login
    setLoading(true);
    const serviceResponse = await fetchFlightListForAirlineService(role_id);
    if (serviceResponse.status === 200) {
        setFlightListState(serviceResponse.data.payload);
        setLoading(false);
    }
    else {
      setOpen(true);
      setMessage('Some Error Occured while fetching data');
    }
  }


  useEffect(() => {
    getFlightListForCurrentAirline();
  }, [])

  const redirectToFlightForm = (flight_id) => {
    navigate(`/flight/${flight_id}`);
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
      {authLoadingState && loading ? (
        <CircularProgress color="success" />

      ) : (

        <>
            <Button
              style={{ marginBottom: "15px",  marginTop: "15px"  }}
              onClick={() => redirectToFlightForm('new')}
              variant={'contained'}
              color={'secondary'}
            >
              Add Flight
            </Button>
          <FlightTable flightListState={flightListState} update={true}/>
          <Button style={{marginTop: '15px',  backgroundColor: "#21b6ae", margin: "15px"}}variant={'contained'} onClick={() => {navigate('/dashboard')}}>Go Back</Button>
        </>


      )}

     </Paper>
    </React.Fragment>);

}

export default ArilineFlightsTable;
