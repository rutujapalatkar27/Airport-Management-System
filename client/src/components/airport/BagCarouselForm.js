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
import { addBagCarouselService } from '../../services/bagCarouselService';


const styles = {
    paperContainer: {
        backgroundImage: `url(${Image})`,
  
      height: "100vh"
    }
  };
  

const BagCarouselForm = () => {
  
   const [loading, setLoading] = useState(false);
   const [bagCarouselState, setBagCarouselState] = useState({status:""});
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState("");
   const navigate = useNavigate();

   const handleFormChange = (e) => {
    
    setBagCarouselState({
      ...bagCarouselState,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    setBagCarouselState({
      ...bagCarouselState,
    });

    if (checkEmptyFields(bagCarouselState) === true) {
      const serviceResponse = await addBagCarouselService(bagCarouselState);
      if (serviceResponse.status === 200) {
        setOpen(true);
        setMessage('Operation Successfull');
        setTimeout(() => { navigate(-1); }, 2500)

      }
      else {
        setOpen(true);
        setMessage('Error Occured: '+serviceResponse.data.message);
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
                  <CardHeader title="Baggage Carousel Detail">
    
                  </CardHeader>
                  <CardContent>
                    <Stack spacing={3}>
                    <TextField
                      id="carousel_number"
                      name="carousel"
                      label="Number"
                      fullWidth
                      autoComplete="Source"
                      variant="standard"
                      onChange={handleFormChange}
                      backgroundcolor="#21b6ae"
                    />
                    <Box sx={{ minWidth: 120, maxWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          name='status'
                          id="demo-simple-select"
                          label="Status"
                          onChange={handleFormChange}
                        >
                          <MenuItem value={'available'}>Available</MenuItem>
                          <MenuItem value={'disabled'}>Under Maintenance</MenuItem>
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
        </React.Fragment>
    
    );
};

export default BagCarouselForm;