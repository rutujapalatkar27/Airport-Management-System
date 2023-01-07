import React, {useContext} from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { AuthContext } from '../contexts/AuthContextProvider';
const Dashboard = ( ) => {

    const authContext = useContext(AuthContext);
    const {userDetails} = authContext;
    const {role} = userDetails;
    const navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const redirectToArrivalFlights = () => {
        navigate('/arrival-flights')
    }
    const redirectToDepartingFlights = () => {
        navigate('/departure-flights')
    }
    const redirectToAirlineService = () => {
        navigate('/airline-flights')
    }
    const redirectToAirportService = () => {
        navigate('/airport-dashboard')
    }

    return(
        <React.Fragment>
            {/* <div>
                <h1>
                    Mavericks Airport System
                </h1>
            </div> */}
            <div>
                <p>
                    Welcome to Mavericks Airport System. This page will help you navigate across different parts of the service
                </p>
            </div>
            <div>
            <Divider></Divider>
            <br></br>
            <Stack direction="row" spacing={2} style={{justifyContent: 'center'}}>
                <Item>
                    <Button onClick={redirectToArrivalFlights}>
                        Check Arrival Flights
                    </Button>
                </Item>
                <Item>
                    <Button onClick={redirectToDepartingFlights}>
                        Check Departing Flights
                    </Button>
                </Item>
            </Stack>
            </div>
            <br></br>
            {
                (role === 'airline') && (
                    <>
                    <Divider></Divider>
                    <br></br>
                    <div style={{justifyContent: 'center'}}>
                        <Button variant="contained" onClick={redirectToAirlineService}>
                            Go to Airline Handling Service
                        </Button>
                    </div>
                    </>
                )
            }
            <br></br>
            {
                (role === 'airport') && (
                    <>
                    <Divider></Divider>
                    <br></br>
                    <div style={{justifyContent: 'center'}}>
                        <Button variant="contained" onClick={redirectToAirportService}>
                            Go to Airport Handling Service
                        </Button>
                    </div>
                    </>
                )
            }

        </React.Fragment>

    );
}

export default Dashboard;