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
import { useNavigate } from 'react-router-dom';
import { fetchBagCarouselListService,addBagCarouselService } from '../../services/bagCarouselService';

const BagCarouselTable = () => {
    

  // const [selectedTerminal, setSelectedTerminal] = useState(1);
  const [bagCarouselListState, setBagCarouselListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


    useEffect(() => {
      fetchBagCarouselListData();
    }, []);
  
    const fetchBagCarouselListData = async () => {
      const serviceResponse = await fetchBagCarouselListService();
      if (serviceResponse.status === 200) {
        setBagCarouselListState(serviceResponse.data.payload);
        setLoading(false);
      }
      else {
        setOpen(true);
        setMessage('Some error occured while fetching data');
      }
    }

    const handleDisable = async(bagCarousel) => {
      const currentCarousel = {...bagCarousel, status : "disabled"} ;
      const serviceResponse = await addBagCarouselService(currentCarousel);
      if (serviceResponse.status === 200) {
        setOpen(true);
        setMessage('Operation Successfull');
        bagCarousel.status="disabled";
        setTimeout(() => { navigate('/carousel'); }, 2500)

      }
      else {
        setOpen(true);
        setMessage('Some Error Occured while disabling baggage Carousel');
      }
    }

    const handleEnable = async(bagCarousel) => {
        const currentCarousel = {...bagCarousel, status : "available"} ;
        const serviceResponse = await addBagCarouselService(currentCarousel);
        if (serviceResponse.status === 200) {
          setOpen(true);
          setMessage('Operation Successfull');
          bagCarousel.status="available";
          // setTimeout(() => { navigate('/carousel'); }, 1000)

      }
      else {
        setOpen(true);
        if(bagCarousel.status="inuse"){
          setMessage(serviceResponse.data.message);
        }
        else
        {
          setMessage('Some Error Occured while enabling baggage Carousel');
        }
      }
    }
    
  const handleClose = () => {
    setOpen(false);
  }

  const redirectToBagCarouselForm = () => {
    navigate(`/carousel/new`);
  }
    return (

        <React.Fragment>
            <div><h3 style={{margin:"0px"}}>Baggage Carousel List</h3></div>
            <div>
                      <Button
                      style={{ marginBottom: "5px",  marginTop: "5px"  }}
                      variant={'contained'}
                      onClick={() => redirectToBagCarouselForm()}
                      color={'primary'}
                    >
                      Add Baggage Carousel
                    </Button>
                    </div>
        <Paper elevation={3}>
        <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
              />
          { 
            bagCarouselListState.length>0?(
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Carousel Number</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align='right'>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {bagCarouselListState.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="left">{row.carousel_number}</TableCell>
                              <TableCell align="center">{row.status == "disabled"? "Under Maintenance" : row.status}</TableCell>
                              {row.status == "disabled" && <TableCell align='right' ><Button
                                            style={{ marginBottom: "10px",  marginTop: "10px"  }}
                                            variant={'contained'}
                                            color={'secondary'}
                                            onClick={()=> handleEnable(row)}
                                        >Enable
                                        </Button> 
                                        </TableCell>}
                                    
                                    {(row.status=="available") &&   <TableCell align='right'><Button
                                            style={{ marginBottom: "10px",  marginTop: "10px"  }}
                                            variant={'contained'}
                                            color={'secondary'}
                                            onClick={()=> handleDisable(row)}
                                        >Disable
                                        </Button>
                                </TableCell>}
                                {row.status=="inuse" &&   <TableCell align='right'><Button
                                            style={{ marginBottom: "10px",  marginTop: "10px"  }}
                                            variant={'contained'}
                                            color={'secondary'}
                                            onClick={()=> handleEnable(row)}
                                        >Free it
                                        </Button>
                                </TableCell>}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
         ):((
          <h1 style={{padding: '25px'}}>No Baggage Carousels</h1>
        ))
        
        } </Paper>
        <Button style={{marginTop: '10px',  backgroundColor: "#21b6ae", margin: "10px"}}variant={'contained'} onClick={() => {navigate(`/airport-baggages`)}}>Go Back</Button>
        </React.Fragment>
            
    );
};

export default BagCarouselTable;