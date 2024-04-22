import React from 'react'
import './403.css'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../../Api/Axios'
import { LOGOUT } from '../../Api/Api'
import Cookie from 'cookie-universal'


function Err403({role}) {

  const cookie=Cookie();
  const nav=useNavigate()
  async function handelLogOut(){
    try{
        let res=await Axios.get(`/${LOGOUT}`)
        cookie.remove('e-commers')
        nav('/')
      }
    catch(err){
        console.log(err)
    }
  }
  return (
    <div className='text-wrapper'>
        <div className='title' data-content={404}>
            403 - ACCESS DENIED
        </div>
        <div className='subtitle'>
            Oops, You dont have permition yo access this page..
        </div>
        <Link to={role==='1996' ? '/dashboard/writer' : '/'} className='btn btn-primary mt-5'>
          {role==='1996'? 'Go To Writer Page' :'Go To Home Page'}
        </Link>
        <button onClick={handelLogOut} className='btn btn-success mt-5'>Log out</button>
    </div>
  )
}

export default Err403