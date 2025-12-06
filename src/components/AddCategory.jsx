import React, { useEffect, useState } from 'react'
import MyModal from './UI/MyModal'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import CategoryList from './CategoryList';
import { addCategory } from '../store/categorySlice';
import { editCategory } from '../store/categorySlice';

function AddCategory() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [categoryImg, setCategoryImg] = useState("");
    const [isEdit, setIsEdit] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit) {
            setTitle(isEdit.title || "");
            setCategoryImg(isEdit.categoryImg || "");
            setDescription(isEdit.description || "");
        
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

    const categoryImgHandler = (e)=>{
        setCategoryImg(e.target.value);
    }
    const descriptionChangeHandler = (e)=>{
        setDescription(e.target.value);
    }
    const resetForm = () => {
        setTitle("");      
        setCategoryImg("");
        setIsEdit(null);
        setDescription("");
        
    };

    const formChangeHandler = (e) => {
        e.preventDefault();
        const categoryDetails = {
            title,description,categoryImg
        }
        if(isEdit){
            dispatch(editCategory({id:isEdit.id,data:categoryDetails}));
        }else{
            dispatch(addCategory(categoryDetails));
        }
        

        resetForm();

    }

    return (
        <React.Fragment>
        <Button onClick={() => { setShowModal(prev => !prev) }}>Add Category</Button>
        <MyModal
            show={showModal} onClose={closeModalHandler}
            title='Add Category' onSave={formChangeHandler}
            saveText={isEdit ? "Edit" : "Add"}>
            <Form onSubmit={formChangeHandler}>
            <Form.Group className='mb-3 mx-2' controlId='categoryName'>
                    <Form.Label>Title</Form.Label>                    
                    <Form.Control type='text' placeholder='Category Name' onChange={titleChangeHandler} value={title} />
                 </Form.Group>
                 <Form.Group className='mb-3 mx-2' controlId='description'>
                    <Form.Label>Description</Form.Label>                    
                    <Form.Control type='text' placeholder='Description' onChange={descriptionChangeHandler} value={description} />
                 </Form.Group>
                 <Form.Group className='mb-3 mx-2' controlId='categoryImage'>
                    <Form.Label>Image</Form.Label>                    
                    <Form.Control
                    type="text"
                    onChange={categoryImgHandler}
                    placeholder='Paste image link'
                    value={categoryImg}
                /></Form.Group>
                 
            </Form>
        </MyModal>
        <CategoryList onEdit={(editData) => {
             setIsEdit(editData)
             setShowModal(true) }} />
    </React.Fragment>

)
}

export default AddCategory
