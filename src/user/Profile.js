import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import {isauthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import {read,update,updateUser} from './apiUser';


const Profile = ({match}) => {
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })
    const {name ,email,password,error,success} = values;
    const {token} = isauthenticated()

    const init = (userId) => {
        console.log(userId)
        read(userId,token).then(data => {
            if(data.error) {
                setValues({...values,error:true})
            } else {
                setValues({...values,name : data.name,email:data.email})
            }
        })
    }

    useEffect(() => {
        init(match.params.userId)
    },[])

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})

    }
    const clickSubmit = event => {
        event.preventDefault()
            update(match.params.userId, token , {name,email,password}).then(data => {
                if(data.error){
                    console.log(error)
                }
                else {
                    updateUser(data,()=>{
                        setValues({...values,name: data.name,email:data.email,success:true});
                    })
                }
            })
    }

    const redirectUser = (success) => {
        if(success) {
            return <Redirect to='/cart' />
        }
    }

   const profileUpdate = (name,email,password) => (
       <form>
           <div className='form-group'>
               <label type='text-muted'>Name</label>
               <input type='text' onChange={handleChange('name')} className='form-control' value={name}/>
               <label type='text-muted'>Email</label>
               <input type='email' onChange={handleChange('email')}  className='form-control' value={email}/>
               <label type='text-muted'>Password</label>
               <input type='password' onChange={handleChange('password')}  className='form-control' value={password}/>
           </div>
           <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
       </form>
   )


    return(
        <Layout title='User Profile Page' description='Update your profie here !!' className='container-fluid'>
             <h2 className='mb-4'>Profile Update</h2> 
             {profileUpdate(name,email,password)}    
             {redirectUser(success)}  
       </Layout>
    )












}

export default Profile;