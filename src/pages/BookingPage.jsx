import React, { useState } from 'react'
import { Container,Col,Row,Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { updateStatus } from '../store/bookingHistorySlice'

function BookingPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const bookingList = useSelector(state=>state.bookingHistory.bookings);

    const handleAccept = (ele)=>{
        dispatch(updateStatus({
            email:ele.email,
            bookingId:ele.bookingId,
            status:"accepted"
        }))
    }

    const handleReject = (ele)=>{
        dispatch(updateStatus({
            email:ele.email,
            bookingId:ele.bookingId,
            status:"rejected"
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
                                <div className='d-flex justify-content-between align-items-center px-1 py-2'>
                                    Rs.{ele.price}/night
                                    
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
