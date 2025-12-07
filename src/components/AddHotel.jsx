import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import MyModal from './UI/MyModal';
import { addHotel, editHotel } from '../store/adminHotelSlice';
import HotelList from './HotelList';

function AddHotel() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [category, setCategory] = useState("");
    const [isEdit, setIsEdit] = useState(null);

    const dispatch = useDispatch();
    const categoryList = useSelector(state => state.category.category);

    useEffect(() => {
        if (isEdit) {

            setTitle(isEdit.title || "");
            setAddress(isEdit.address || "");
            setPrice(isEdit.price || "");
            setPincode(isEdit.pincode || "");
            setCity(isEdit.city || "");
            setImage(isEdit.image || "");
            setShowModal(true);
        } else {
            resetForm();
        }
    }, [isEdit]);


    const closeModalHandler = () => {
        setShowModal(false);
        resetForm();
    }
    const titleChangeHandler = (e) => {
        setTitle(e.target.value);
    }
    const priceChangeHandler = (e) => {
        setPrice(e.target.value);
    }
    const addressChangeHandler = (e) => {
        setAddress(e.target.value);
    }
    const cityChangeHandler = (e) => {
        setCity(e.target.value);
    }
    const pincodeChangeHandler = (e) => {
        setPincode(e.target.value);
    }
    const imageChangeHandler = (e) => {
        setImage(e.target.value);
    }

    const categoryChangeHandler = (e) => {
        setCategory(e.target.value);
    }
    const resetForm = () => {
        setTitle("");
        setAddress("");
        setPrice("");
        setPincode("");
        setImage("");
        setCity("");
        setIsEdit(null);
    };
    const formChangeHandler = (e) => {
        e.preventDefault();
        const hotelDetails = {
            title, price, pincode, city, address, image, category
        }
        if (isEdit) {
            dispatch(editHotel({ id: isEdit.id, data: hotelDetails }));
        } else {
            dispatch(addHotel(hotelDetails));
        }
        resetForm();


    }

    return (
        <Container className="p-0">
            <div className="text-center m-0 p-0">
                <Button onClick={() => setShowModal(true)}>Add New Hotel</Button>
                <h3 className="mt-3 mb-4">Listed Hotel</h3>
            </div>

            <Row className='d-flex flex-wrap justify-content-start gap-3 m-0 p-0'>
                <Col className="m-0 p-0">
                    <HotelList onEdit={(editData) => {
                        setIsEdit(editData)
                        setShowModal(true)
                    }} />
                </Col>
            </Row>

            

            <MyModal
                show={showModal} onClose={closeModalHandler}
                title='Add Hotel' onSave={formChangeHandler}
                saveText={isEdit ? "Edit" : "Add"}>
                <Form onSubmit={formChangeHandler}>
                    <Form.Group className='mb-3 mx-2' controlId='hotelName'>
                        <Form.Label>Hotel Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter Hotel Name' onChange={titleChangeHandler} value={title} />
                    </Form.Group>
                    <Form.Group className="mb-3 mx-2" controlId="pincode">
                        <Form.Label>PIN Code</Form.Label>
                        <Form.Control type="number" max={6} placeholder="e.g. 110001" onChange={pincodeChangeHandler} value={pincode} />
                    </Form.Group>
                    <Form.Group className="mb-3 mx-2" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select onChange={categoryChangeHandler} value={category}>
                            <option value="">Select a Category</option>
                            {categoryList.map(ele => {
                                return <option key={ele.id} value={ele.title}>{ele.title}</option>
                            })}

                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3 mx-2" controlId="price">
                        <Form.Label>Price per Night</Form.Label>
                        <Form.Control type="number" placeholder="e.g. 2500" onChange={priceChangeHandler} value={price} />
                    </Form.Group>
                    <Form.Group className="mb-3 mx-2" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="e.g. New Delhi" onChange={cityChangeHandler} value={city} />
                    </Form.Group>
                    <Form.Group className="mb-3 mx-2" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" row={2} placeholder="e.g. 129 G New Delhi" onChange={addressChangeHandler} value={address} />
                    </Form.Group>
                    <Form.Group className="mb-3 mx-2" controlId="image">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" placeholder="Paste image link" onChange={imageChangeHandler} value={image} />
                    </Form.Group>




                </Form>
            </MyModal>

        </Container>
    )
}

export default AddHotel
