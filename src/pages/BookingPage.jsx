import React, { useState } from 'react'
import { Container,Col,Row,Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { updateStatus } from '../store/bookingHistorySlice'
import "./BookingPage.css"

function BookingPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const bookingList = useSelector(state=>state.bookingHistory.bookings);

    const handleAccept = (ele)=>{
        dispatch(updateStatus({
            email:ele.email,
            bookingId:ele.bookingId,
            status:"accepted",
            hotelData:ele
        }))
    }

    const handleReject = (ele)=>{
        dispatch(updateStatus({
            email:ele.email,
            bookingId:ele.bookingId,
            status:"rejected",
            hotelData:ele
        }))
    }

    if(!bookingList || bookingList.length===0){
        return (
            <Container>
                <p>Loading Booking History...</p>
                <Button variant="secondary" onClick={() => history.goBack()}>
          Go Back
        </Button>
            </Container>
        )
    }else{
    return (
        <Container>
        <Row className='d-flex flex-wrap justify-content-start gap-3 m-0 p-0'>
            {bookingList.map(ele=>{
                    return <Col key={ele.bookingId} md={3} style={{width:"400px",margin:"auto"}} className='m-0 p-0'>
                    <Card style={{ width: "100%"}} className='m-0 p-0 text-center'>
                            <Card.Body className='m-0 p-0'>
                                <img src={ele.image} width="100%" height="100%"/>
                                <Card.Title>
                                    {ele.title}
                                </Card.Title>
                                <div className="booking-item">
                                <p>Price:{ele.price}/night</p>
                                <p>Address:{ele.address}</p>
                                <p>Pincode:{ele.pincode}</p>
                                <p>City:{ele.city}</p>
                                <p>Email:{ele.email}</p>
                                </div>
                                                               
                                
                                <Card.Title>Status:{ele.status}</Card.Title>
                            </Card.Body>
                            {ele.status==="pending" && <div className='d-flex justify-content-between'>
                                <Button onClick={()=>{handleReject(ele)}} variant='outline-danger'>Reject</Button>
                                <Button onClick={()=>{handleAccept(ele)}} variant='outline-dark'>Accept</Button>
                            </div>}
                        </Card>
                    </Col>
                    
                    
                })}
            </Row>
       </Container>
    )
            }
}

export default BookingPage
