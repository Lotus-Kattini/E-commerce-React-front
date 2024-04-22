import Cookie from 'cookie-universal'
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { USER } from '../../Api/Api';
import Loading from '../../Components/loading/Loading';
import { Axios } from '../../Api/Axios';
import Err403 from './Err403';

function RequireAuth({allowedrole}) {
    //token
    const cookie=Cookie();
    const token=cookie.get('e-commers')

    //navigate
    const nav=useNavigate()

    //user
    const [user,setuser]=useState('')

    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then((data)=>setuser(data.data))
        .catch(()=>nav('/login',{replace:true}))
    },[])


  return (
    <>
        {token ? user ==='' ?
         <Loading/> :allowedrole.includes(user.role)? <Outlet/>
         :<Err403 role={user.role}/>
         : <Navigate to={'/login'} replace={true}/>}
    </>
  )
}

export default RequireAuth