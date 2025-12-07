import React from 'react'
import { Button,Row,Col,Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { deleteHotel } from '../store/adminHotelSlice';

function HotelList({onEdit}) {
    const dispatch = useDispatch();
    const deleteHotelHandler=(id)=>{
        dispatch(deleteHotel(id))
    }
    const hotelList = useSelector(state=>state.adminHotels.hotels);
    return (
        <Row className='m-0 p-0'>
                        
                {hotelList.map(ele=>{

                    return <Col md={4} className='d-flex flex-wrap gap-2 m-0 p-0' key={ele.id}>
                        <Card className='p-0 m-0'>
                            <img src={ele.image}width="100%" height="250px" alt={ele.title}/>
                            <p>{ele.title}</p>
                            <p>{ele.price}</p>
                            <p>{ele.address}</p>
                            <p>{ele.pincode}</p>
                            <p>{ele.city}</p>
                            <p>{ele.email}</p>
                            <div className='product-actions d-flex justify-content-between'>
                             <Button variant="outline-dark" onClick={()=>{onEdit(ele)}}>Edit</Button>
                             <Button variant='outline-danger' onClick={()=>{deleteHotelHandler(ele.id)}}>Delete</Button>
                            </div>
                        </Card>
                    </Col>
                    
                })}
        </Row>
    )
}

export default HotelList
