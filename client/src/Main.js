//SJSU CMPE 138 Spring 2022 TEAM3 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightForm from './components/flight/FlightForm';
import FlightTablePage from './components/flight/FlightTablePage';
import AirlineFlightsTable from './components/flight/AirlineFlightsTable';
import Login from './components/user/Login';
import AuthContext from './contexts/AuthContextProvider';
import PrivatePath from './components/PrivatePath';
import AirportGates from './components/airport/AirportGates';
import GateTable from './components/airport/GateTable';
import TerminalForm from './components/airport/TerminalForm';
import GateForm from './components/airport/GateForm';
import Dashboard from './components/Dashboard';
import BagCarousel from './components/airport/BagCarousel';
import BagCarouselTable from './components/airport/BagCarouselTable';
import BagCarouselForm from './components/airport/BagCarouselForm';
import AirportDashboard from './components/airport/AirportDashboard';
import NavBar from './components/Navbar';


const Main = () => {
    return (
        <div>
            <AuthContext>
                <Router>
                    <NavBar/>
                    <br></br>
                    <Routes>
                    <Route path="/"
                            element={<Dashboard />}
                        />
                        <Route path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route path="/login"
                            element={<Login />}
                        />
                        <Route path="/arrival-flights"
                            element={<FlightTablePage status={'arrival'} />}
                        />
                        <Route path="/departure-flights"
                            element={<FlightTablePage status={'departure'} />}
                        />
                        <Route path="/flight/new"
                            element={<FlightForm />}
                        />
                        <Route path="/terminal/new"
                            element={<TerminalForm />}
                        />
                        <Route path="/terminal/:id"
                            element={<TerminalForm />}
                        />
                        <Route path="/gate/:id"
                            element={<GateForm />}
                        />
                        <Route path="/flight/update/:id"
                            element={
                                <PrivatePath>
                                    <FlightForm />
                                </PrivatePath>
                            }
                        />
                        <Route path="/airline-flights" element={
                            <PrivatePath>
                                <AirlineFlightsTable />
                            </PrivatePath>
                        }></Route>

                        <Route path="/airport-baggages"
                            element={<BagCarousel />}
                        />

                        <Route path="/carousel"
                            element={<BagCarouselTable />}
                        />
                        <Route path="/carousel/new"
                            element={<BagCarouselForm />}
                        />
                        <Route path="/airport-dashboard"
                            element={
                                <PrivatePath>
                                    <AirportDashboard />
                                </PrivatePath>
                            }></Route>
                        <Route path="/airport-gates"
                            element={
                                <AirportGates />
                            }></Route>
                        {/* <Route path="/gates"
                            element={<GateTable />}
                        /> */}

                    </Routes>
                </Router>
            </AuthContext>
        </div>
    );
}

export default Main;