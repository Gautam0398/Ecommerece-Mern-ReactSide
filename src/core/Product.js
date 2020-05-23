import React, {useState,useEffect} from 'react';
import Layout from './Layout';
import {getProducts,read,listRelated} from './apiCore';
import Card from './card';


const Product = (props) => {


    const [product,setProduct] = useState([])
    const [relatedProduct,setrelatedProduct] = useState([])
    const [error,setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setProduct(data)
                // fetch related products
                listRelated(data._id).then(result =>{
                    if(result.error){
                        setError(result.error)
                    } else {
                        setrelatedProduct(result)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId =props.match.params.productId
        loadSingleProduct(productId)
    },[props])


    return(
        <Layout title={ product && product.name} description={product && product.description && product.description.substring(0,100)} className='container-fluid'>
                
            <div className='row'>
            <div className='col-8'>
             {product && product.description && (<Card product={product} showViewProductButton={false} />)}
             </div>
             <div className='col-4'>
                 <h4>Related Products</h4>
                 {relatedProduct.map((p,i)=>(
                     <div  key={i} className='mb-3'>
                            <Card  product = {p}/>
                     </div>
                 ))}
             </div>
            </div>       
        </Layout>
    )
}

export default Product;