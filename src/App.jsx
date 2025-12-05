import React, { useEffect } from 'react'
import './App.css'
import AdminAuth from './components/Auth/AdminAuth'
import { Switch ,Route, Redirect} from 'react-router-dom/cjs/react-router-dom.min'
import AdminHomePage from './components/AdminHomePage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAdminToken } from './store/authSlice'

function App() {
const {isAdmin,loading} = useSelector(state=>state.auth);
const dispatch = useDispatch();

useEffect(()=>{
  const storedToken = localStorage.getItem("adminToken");
  if(storedToken){
    dispatch(checkAdminToken(storedToken));
  }
  
},[])

if(loading){
  return <p>Checking Authentication...</p>
}

  return <React.Fragment>
    <Switch>
      
      <Route path="/admin/auth" exact>
        {!isAdmin ? <AdminAuth/> : <Redirect to="/admin/home"/>}</Route>
        <Route path="/admin/home" exact>
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
