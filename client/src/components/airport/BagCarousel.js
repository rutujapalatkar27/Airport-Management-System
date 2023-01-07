import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchArrivalFlightListBasedOnBagCarouselService } from '../../services/flightService';
import FlightTable from '../flight/FlightTable';

const BagCarousel = () => {

    const [flightListState, setFlightListState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  
    const handleSnackbarClose = () => {
      setOpen(false);
    }

    const redirectToCarouselList = () => {
      navigate("/carousel")
    }
  
    useEffect(() => {
      fetchFlightListData();
    }, []);
  
    const fetchFlightListData = async () => {
      const serviceResponse = await fetchArrivalFlightListBasedOnBagCarouselService();
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
          <h2>Arrival Flights List for Baggage Assignment</h2>
        </div>
        {loading ? 
          (
            <CircularProgress color="success" />
          ) :
          (
            <div>
              <FlightTable flightListState={flightListState} bagAssign={true}/>
            </div>
          )
        }
        <br></br>
        <div style={{justifyContent: 'center'}}>

          <Button variant="contained" onClick={redirectToCarouselList}>
            Add/Update Baggage Carousel
          </Button>
        </div>
        <br></br>
            <Button style={{marginTop: '10px',  backgroundColor: "#21b6ae", margin: "10px"}}variant={'contained'} onClick={() => {navigate(`/airport-dashboard`)}}>Go Back</Button>
      </React.Fragment>
    );
};

export default BagCarousel;