import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
//import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { adminLogin } from '../../store/authSlice';

function AdminAuth() {
     const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const [error,setError] = useState("");
    const history = useHistory();
 
    const emailChangeHandler = (e)=>{
        setEmail(e.target.value);
    }
    const passwordChangeHandler = (e)=>{
        setPassword(e.target.value);

    }
    const formChangeHandler =(e)=>{
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
          setError("All Fields are required");
          return;
      }
      setError("");
        const userData = {
            email,password,returnSecureToken:true
        }
        dispatch(adminLogin(userData));
        
        setEmail("");
        setPassword("");

        history.replace("/admin/home");
    }
    return (
        <Container fluid className='d-flex justify-content-center align-items-center vh-100'
        style={{backgroundColor:"gray"}}>
            <div className='p-4' style={{backgroundColor:"#ffffff",width:"380px",borderRadius:"16px"}}>
            <h3 className='text-center mb-4' style={{color:"#6f42c1"}}>Admin Login</h3>
            <Form onSubmit={formChangeHandler}>
                <Form.Control className='mb-3' type='email' placeholder='Email' onChange={emailChangeHandler} value={email}/>
                <Form.Control className='mb-3' type='password' placeholder='Password' onChange={passwordChangeHandler} value={password}/>
               {error && <p className="text-danger fw-bold">{error}</p>}
      
           <Button type='submit' className='w-100 py-2 mt-2' style={{backgroundColor:"#6f42c1"}}>LOGIN</Button>
            
            </Form>
            
            </div>
           

        </Container>
    )
}

export default AdminAuth
