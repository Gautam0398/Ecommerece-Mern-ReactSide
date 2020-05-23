import React, {useState,useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './card';
import Search from './Search';
const Home = () => {

    const [productsBySell , setProductsBySell] = useState([])
    const [productsByArrival , setProductsByArrival] = useState([])
    const [error,setError] = useState([])


    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }
    

    useEffect(()=> {
        loadProductsByArrival()
        loadProductsBySell()
    },[])


    return(
        <Layout title='Home Page' description='Node React Ecommmerce App' className='container-fluid'>
            <Search/>    
            <br></br>
            <h2 className='mb-4'>Fresh Arrivals</h2>
            <hr></hr>
                <div className='row'>
                {productsByArrival.map((product,i) => (
                  <div key={i} className='col-4 mb-3'>
                      <Card  product={product} />
                  </div>
                ))}
                </div>
            <hr></hr>    
            <h2 className='mb-4'>Best Sellers</h2>
            <hr></hr>
               <div className='row'>
               {productsBySell.map((product,i) => (
                   <div  key={i} className='col-4 mb-3'>
                          <Card product={product} />
                   </div>
               ))}
               </div>

               
            
            
    </Layout>
    )
    
};

export default Home;
