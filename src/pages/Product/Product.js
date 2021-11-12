import React from 'react';
import { Card } from 'react-bootstrap';
import './Product.css'
const Product = ({product}) => {
    const {name,exterior,price,img}=product
    return (
     <div className='col-md-4'>
       <Card.Img variant="top" src={img} className='img-hover' />
       <Card.Body>
    <h1 className='text-danger'>${price}</h1>
    <Card.Text className='text-secondary'>
      Model: {name}
    </Card.Text >
    <Card.Text className='text-secondary'>
     Exterior: {exterior}
    </Card.Text >
    <button variant="primary">Go somewhere</button>
  </Card.Body>

     </div>
       
        
    );
};

export default Product;