import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux';
import NavBar from './Navbar';
import {Route } from 'react-router-dom/cjs/react-router-dom.min';
import AllHotels from '../pages/AllHotels';
import BookingPage from '../pages/BookingPage';
import ManageListings from '../pages/ManageLIstings';

function AdminHomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    
    return (
        <React.Fragment>
        <NavBar/>
        <Route path="/admin/home" exact><AllHotels/></Route>
        <Route path="/admin/bookings" exact><BookingPage/></Route>
        <Route path="/admin/listings" exact><ManageListings/></Route>
       </React.Fragment>
    )
}

export default AdminHomePage
