import React,{useState} from 'react';
import Layout from '../core/Layout';
import { isauthenticated } from '../auth/index';
import { Link } from 'react-router-dom';
import {createCategory} from './apiadmin';




const AddCategory = () => {
    const [name,setName]= useState('')
    const [error,setError]= useState(false)
    const [success,setSuccess]= useState(false)


    // destructuring user and info from localstorage
    const {user,token} = isauthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api for creating category
        createCategory(user._id,token,{name}).then(data => {
            if(data.error){
                setError(true)
            } else {
                setError('');
                setSuccess(true);
            }

        })
    }

    const newCategoryForm = () => {
       return ( <form onSubmit={clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input type='text' className='form-control' onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className='btn btn-outline-primary'> Create Category </button>
        </form>
       )
    }
    
    const showSuccess = () => {
        if(success){
        return <h3 className='text-success'>{name} Category is created</h3>
        }
    }

    const showError = () => {
        if(error){
        return <h3 className='text-danger'>Category should be unique !</h3>
        }
    }

    const goBack = () =>  (
         <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning ' >Back To Dashboard</Link>
        </div>
       );
    return (
        <Layout title="Add a New Category" description={`Welcome ${user.name}! ready to add a New Category`} >
             
              <div className='row'>
                  <div className='col-md-8 offset-md-2'>
                          {showSuccess()}
                          {showError()}
                          {newCategoryForm()}
                          {goBack()}
                  </div>
              </div>

              
        </Layout>       
  )



}

export default AddCategory;