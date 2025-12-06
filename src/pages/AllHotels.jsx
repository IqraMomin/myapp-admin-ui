import React from 'react'
import AddHotel from '../components/AddHotel'
import HotelList from '../components/HotelList'
import AddCategory from '../components/AddCategory'

function AllHotels() {
    return (
        <React.Fragment>
            <h1>Admin Dashboard - Admin Hotels</h1>
            <AddCategory/>
        </React.Fragment>

    )
}

export default AllHotels
