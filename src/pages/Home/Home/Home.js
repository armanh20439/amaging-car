import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Products from '../../Products/Products';
import Banner from '../Banner/Banner';
import CardCar from '../CardCar/CardCar';
import HomeProduct from '../HomeProduct/HomeProduct';

const Home = () => {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])
    return (
        <div>
            <Banner></Banner>
            <Container>
            <div className='row'>
            {
                products.slice(0,6).map(product=><HomeProduct
                product={product}
                key={product._id}
                
                ></HomeProduct>)
            }
                </div>
 </Container>
            
            <CardCar></CardCar>
        </div>
    );
};

export default Home;