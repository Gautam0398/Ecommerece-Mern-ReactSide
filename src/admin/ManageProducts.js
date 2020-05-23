import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import { isauthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import {getProducts,deleteProduct} from './apiadmin';


const ManageProducts = () => {

    const [products,setProducts] = useState([])
    const {user,token} = isauthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error)
            }
             else{
                 setProducts(data)
             }
        })
    }
    const destroy = produtId => {
        deleteProduct(produtId,user._id,token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts()
    },[])



    return(
        <Layout title='Manage Products' description='Perform CRUD on products' className='container-fluid'>
           <div className='row'>
                <div className='col-12'>
                    <h2 className='text-center'>Total {products.length} </h2>
                    <hr></hr>
                    <ul className='list-group'>
                        {products.map((p,i) => (
                            <li key={i} className='list-group-item d-flex justify-content-between align-items-center'>
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className='badge badge-warning badge-pill'>Update</span>         
                                </Link>
                                <span onClick={() => destroy(p._id)} className='badge badge-danger badge-pill'>Delete</span>
                            </li>
                        ))}
                    </ul>
                </div>
               </div> 
       </Layout>
    )
}

export default ManageProducts;