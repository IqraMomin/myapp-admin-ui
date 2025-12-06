import React, { useEffect } from 'react'
import './App.css'
import AdminAuth from './components/Auth/AdminAuth'
import { Switch ,Route, Redirect} from 'react-router-dom/cjs/react-router-dom.min'
import AdminHomePage from './components/AdminHomePage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAdminToken } from './store/authSlice'
import { fetchHotelList } from './store/adminHotelSlice'
import { fetchCategoryList } from './store/categorySlice'
import { fetchBookings } from './store/bookingHistorySlice'

function App() {
const {isAdmin,loading} = useSelector(state=>state.auth);
const dispatch = useDispatch();

useEffect(()=>{
  const storedToken = localStorage.getItem("adminToken");
  if(storedToken){
    dispatch(checkAdminToken(storedToken));
  }
  
},[])

  useEffect(()=>{
    dispatch(fetchHotelList());
    dispatch(fetchCategoryList());
    dispatch(fetchBookings());
  },[isAdmin,dispatch]);

if(loading){
  return <p>Checking Authentication...</p>
}

  return <React.Fragment>
    <Switch>
      
      <Route path="/admin/auth" exact>
        {!isAdmin ? <AdminAuth/> : <Redirect to="/admin"/>}</Route>
        <Route path="/admin">
        {isAdmin ? <AdminHomePage /> : <Redirect to="/admin/auth" />}
      </Route>
      <Route path="/" exact>
        <Redirect to="/admin/auth" />
      </Route>
      <Route path="*">
        <Redirect to="/admin/auth" />
      </Route>
    </Switch>
  </React.Fragment>
    
}

export default App
