import React, {useContext} from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { AuthContext } from '../../contexts/AuthContextProvider';

const AirportDashboard = () => {

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

    const redirectToAirportBaggages = () => {
        navigate('/airport-baggages')
    }
    const redirectToAirportGates = () => {
        navigate('/airport-gates')
    }

    return (
<React.Fragment>
            <div>
                <h1>
                    Airport Handling Service
                </h1>
            </div>
            <div>
                <p>
                    Welcome to Airport Handling Service. This page will help you navigate across different parts of the handling service
                </p>
            </div>
            <div>
            <Divider></Divider>
            <br></br>
            <Stack direction="row" spacing={2} style={{justifyContent: 'center'}}>
                <Item>
                    <Button onClick={redirectToAirportGates}>
                    Go to Gate Handling Service
                    </Button>
                </Item>
                <Item>
                    <Button onClick={redirectToAirportBaggages}>
                    Go to Baggage Handling Service
                    </Button>
                </Item>
            </Stack>
            </div>
            <br></br>
            <Button style={{marginTop: '10px',  backgroundColor: "#21b6ae", margin: "10px"}}variant={'contained'} onClick={() => {navigate(`/`)}}>Go Back</Button>
        </React.Fragment>
    );
};

export default AirportDashboard;