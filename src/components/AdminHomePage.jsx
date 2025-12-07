import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux';
import {Route } from 'react-router-dom/cjs/react-router-dom.min';
import AllHotels from '../pages/AllHotels';
import BookingPage from '../pages/BookingPage';
import AddHotel from './AddHotel';
import Navbar from './Navbar';
function AdminHomePage() {
    
    return (
        <React.Fragment>
        <Navbar/>
        <Route path="/admin/home" exact><AllHotels/></Route>
        <Route path="/admin/bookings" exact><BookingPage/></Route>
        <Route path="/admin/listings" exact><AddHotel/></Route>
       </React.Fragment>
    )
}

export default AdminHomePage
