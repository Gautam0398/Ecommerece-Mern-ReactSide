import React , {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import { signin,authenticate,isauthenticated } from '../auth';

const Signin = () => {
    const [values,setValues] = useState({
        email:'ABC@dc.com',
        passsword:'ABC123',
        error:'',
        loading:false,
        redirectToReferrer:false
    });

    const {email,password,loading,error,redirectToReferrer} = values;
    const {user} = isauthenticated()
    /**
     * handleChange is an high order function in where one function returns another function
     */
    const handleChange = name => event => {

        setValues({...values,error:false, [name]: event.target.value});
   
    }


    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values,error:false,loading:true});
        signin({email,password}).then(data => {
            if(data.error) {
                setValues({...values,error:data.error,loading:false})
            } else {
                authenticate(data ,()=>{
                    setValues({
                        ...values,
                        redirectToReferrer:true
                    })
                })
            }
        });
    }

    const signInForm = () => (
        <form>

            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={handleChange('email')} type='email' className='form-control' value={ email }/>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input onChange={handleChange('password')} type='password' className='form-control' value={ password }/>
            </div>

            <button onClick={clickSubmit} className='btn btn-primary'>Login</button>  



        </form>
    )

    const showError = () => {
        return(
         <div className='alert alert-danger' style={{display:error ? '':'none'}}>
             {error}
         </div>);
    }    
    const showLoading = () => {
        return(
          loading && (
              <div className='alert alert-info'>
                  <h2>Loading...</h2>
              </div>
          )
        );
   }  
   
   const redirectUser = () => {
       if(redirectToReferrer){
           if(user && user.role ===1) {
               return <Redirect to='/admin/dashboard'/>
           } else {
            return <Redirect to='/user/dashboard' />
           }
       }
       if(isauthenticated()){
        return <Redirect to='/'/>
       }
   }


    return (
        <Layout title='Signin Page' description='Signin to React Ecommmerce App' className='container col-md-8 offset-md-2'>
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
}
export default Signin;