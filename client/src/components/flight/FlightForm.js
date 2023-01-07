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
import { addFlightService, fetchFlightDetailsService } from '../../services/flightService';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { ConstructionOutlined } from '@mui/icons-material';
import { addBagCarouselService, fetchAvailableBagCarouselListService } from '../../services/bagCarouselService';

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,

    height: "100vh"
  }
};


const FlightForm = () => {

    // need to get from user context
  const authContext = useContext(AuthContext);
  const {userDetails} = authContext;
  const {role_id,role} = userDetails;
  const [flightState, setFlightState] = useState({airline_id: role_id, bagCarousel: 1});
  const [selectedCarousel, setSelectedCarousel] = useState(1);
  const[bagCarousel, setBagCarouselState] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const {id: flightId} = params;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if(flightId != undefined){
      fetchFlightDetails(flightId);
      if(role == "airport"){
        fetchAvailableBaggageCarouselList();
      }
    }
  }, [])

  const fetchAvailableBaggageCarouselList = async () => {
    setLoading(true);
    const serviceResponse = await fetchAvailableBagCarouselListService();
    if (serviceResponse.status === 200) {
      setBagCarouselState(serviceResponse.data.payload);
      // setSelectedCarousel(serviceResponse.data.payload[0]);
      setLoading(false);
  }
    else {
      setOpen(true);
      setMessage('Some Error Occured while fetching baggage list data');
    }
  }
  const fetchFlightDetails = async (flightId) => {
    setLoading(true);
    const serviceResponse = await fetchFlightDetailsService(flightId);
    if (serviceResponse.status === 200) {
      setFlightState(serviceResponse.data.payload[0]);
      setLoading(false);
  }
    else {
      setOpen(true);
      setMessage('Some Error Occured while fetching data');
    }
  }

  const handleFormChange = (e) => {
    
    setFlightState({
      ...flightState,
      [e.target.name]: e.target.value
    });
  }

  const handleDateChange = (e) => {
    setFlightState({
        ...flightState,
        time_of_flight: e,
      });
  }
  const handleCarouselChange = (e) =>{
    setFlightState({...flightState,
        bagCarousel:e.target.value.id});
        setSelectedCarousel(e.target.value);
  }
  const handleSubmit = async (e) => {

    const finalTime = dayjs(flightState.time_of_flight).format('MM/DD/YYYY HH:mm');
    setFlightState({
      ...flightState,
      time_of_flight: finalTime,
    });

    if (checkEmptyFields(flightState) === true) {
      const serviceResponse = await addFlightService(flightState);
      if (serviceResponse.status === 200) {
        if(role == "airport"){
          const bagStatusChangeServiceResponse = await addBagCarouselService({...selectedCarousel, status:"inuse"});
          if(bagStatusChangeServiceResponse.status === 200){
            setOpen(true);
            setMessage('Operation Successfull');
            setTimeout(() => { navigate('/airport-baggages'); }, 2500)            
          }
            else {
              setOpen(true);
              setMessage('Some Error Occured while updating Carousel state');
            }
        }
        else{
        setOpen(true);
        setMessage('Operation Successfull');
        setTimeout(() => { navigate('/airline-flights'); }, 2500)
        }

      }
      else {
        setOpen(true);
        setMessage('Some Error Occured while updating flight');
      }
    }
    else {
      setOpen(true);
      setMessage('Please Fill out all the fields');
      console.log("flg",flightState);
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
              <CardHeader title="FlightDetails">

              </CardHeader>
              <CardContent>
                <Stack spacing={3}>
                <TextField
                  id="flight_number"
                  name="flight_number"
                  label="Number"
                  fullWidth
                  autoComplete="Source"
                  variant="standard"
                  onChange={handleFormChange}
                  value={flightState.flight_number}
                  backgroundcolor="#21b6ae"
                  disabled = {role=="airport"}
                />
                <TextField
                  id="source"
                  name="source"
                  label="Soure"
                  fullWidth
                  autoComplete="Source"
                  variant="standard"
                  onChange={handleFormChange}
                  value={flightState.source}
                  disabled = {role=="airport"}
                />
                <TextField
                  id="destination"
                  name="destination"
                  label="Destination"
                  fullWidth
                  autoComplete="Source"
                  variant="standard"
                  onChange={handleFormChange}
                  value={flightState.destination}
                  disabled = {role=="airport"}
                />
               {role != "airport" ?(<Box sx={{ minWidth: 120, maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name='status'
                      id="demo-simple-select"
                      value={flightState.status}
                      label="Status"
                      onChange={handleFormChange}
                    >
                      <MenuItem value={'arrival'}>Arrival</MenuItem>
                      <MenuItem value={'departure'}>Departure</MenuItem>
                    </Select>
                  </FormControl>
                </Box> ):(<Box sx={{ minWidth: 120, maxWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Bag Carousel</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name='bagCarousel'
                      id="demo-simple-select"
                      value={selectedCarousel}
                      label="bagCarousel"
                      onChange={handleCarouselChange}
                    >
                      {bagCarousel.map((row)=>(
                    <MenuItem key = {row.id} value={row}>Carousel {row.carousel_number}</MenuItem>
                      ))

                      }

                    </Select>
                  </FormControl>
                </Box>) }
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Date&Time picker"
                    value={flightState.time_of_flight}
                    onChange={handleDateChange}
                    disabled = {role == "airport"}
                    renderInput={(params) => <TextField {...params} />}
                    ampm={false}
                />
                </LocalizationProvider>
                </Stack>
              </CardContent>
              <CardActions style={{justifyContent:'center'}}>
              <Button style={{backgroundColor: "#21b6ae"}} variant={'contained'} onClick={handleSubmit}>Submit</Button>
              </CardActions>
            </Card>
          </div>
          <Button style={{marginTop: '15px',  backgroundColor: "#21b6ae", margin: "15px"}}variant={'contained'} onClick={() => {navigate(-1)}}>Go Back</Button>
        </>


      )}

     </Paper>
    </React.Fragment>);

}

export default FlightForm;
