import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux';
import NavBar from './Navbar';
import {Route } from 'react-router-dom/cjs/react-router-dom.min';

function AdminHomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    
    return (
        <React.Fragment>
        <NavBar/>
        {/* <Route path="/admin/products"><Products/></Route>
        <Route path="/admin/category"><Category/></Route> */}
        </React.Fragment>
    )
}

export default AdminHomePage
