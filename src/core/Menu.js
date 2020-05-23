import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isauthenticated} from '../auth/index';
import {itemTotal,emptyCart} from './cartHelpers';
import { useAlert } from 'react-alert';
/**
 * Link : it is basically adavanced version <a> tag of html
 * witRouter: it is basically used for accessing the props history
 */

 const isActive = (history,path) => {
     if(history.location.pathname === path){
         return {color:'#ff9900'}
     } else {
        return {color:'#ffffff'}
     }

 }

 


 const Menu = ({ history}) => {
    const alert = useAlert()

    return (
        <div>
        <ul className = 'nav nav-tabs bg-primary'>
            <li className='nav-item'>
                <Link style = {isActive(history,'/')} className='nav-link' to='/'>Home</Link>
            </li>

             <li className='nav-item'>
                <Link style = {isActive(history,'/shop')} className='nav-link' to='/shop'>Shop</Link>
            </li>  

            <li className='nav-item'>
                <Link style = {isActive(history,'/cart')} className='nav-link' to='/cart'>
                    Cart <sup><small className='cart-badge'>{itemTotal()}</small></sup>
                    </Link>

            </li>  

            {isauthenticated() && isauthenticated().user.role === 0 &&(
                <li className='nav-item'>
                <Link style = {isActive(history,'/user/dashboard')} className='nav-link' to='/user/dashboard'>Dashboard</Link>
            </li>
            )}

           {isauthenticated() && isauthenticated().user.role === 1 &&(
                <li className='nav-item'>
                <Link style = {isActive(history,'/admin/dashboard')} className='nav-link' to='/admin/dashboard'>Dashboard</Link>
            </li>
            )}
           {!isauthenticated() &&(
               <Fragment>
                     <li className='nav-item'>
                        <Link style = {isActive(history,'/signin')} className='nav-link' to='/signin'>Signin</Link>
                    </li>
                   <li className='nav-item'>
                       <Link style = {isActive(history,'/signup')} className='nav-link' to='/signup'>Signup</Link>
                   </li>
               </Fragment>
           )}
           {isauthenticated() && (
                <li className='nav-item'>
                <span style = {{cursor:'pointer',color:'#ffffff'}} className='nav-link' onClick={() => signout(() => {

                    emptyCart(() => {
                                  alert.show('after you Sign out your cart will become empty so make sure of your cart Items!')  
                                });
                    history.push('/signin')
                })}>Signout</span>
            </li>
           )}
        </ul>
    </div>
    )
 }
    
    
 

 export default withRouter(Menu);