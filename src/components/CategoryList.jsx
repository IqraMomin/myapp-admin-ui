import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from '../store/categorySlice';
import Carousel from "react-multi-carousel";

function CategoryList({ onEdit }) {
    const dispatch = useDispatch();
    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id))
    }
    const categoryList = useSelector(state => state.category.category);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        }
    }
    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            arrows={true}
            keyBoardControl={true}
            containerClass="carousel-container"
        >
            {categoryList.map((cat) => (
                <Card key={cat.id} className="m-2 shadow-sm text-center" style={{ borderRadius: "12px" }}>
                    <Card.Img
                        variant="top"
                        src={cat.categoryImg}
                        style={{
                            height: "150px",
                            objectFit: "cover",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                        }}
                    />
                    <Card.Body>
                        <Card.Title>{cat.title}</Card.Title>
                        <Card.Title>{cat.description}</Card.Title>
                        <div className='product-actions d-flex justify-content-center gap-3'>
                            <Button onClick={() => { onEdit(cat) }}>Edit</Button>
                            <Button onClick={() => { deleteCategoryHandler(cat.id) }}>Delete</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Carousel>



    )
}

export default CategoryList
