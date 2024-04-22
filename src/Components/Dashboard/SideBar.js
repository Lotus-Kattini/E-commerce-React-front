import { faPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu } from '../../Context/Menucontext'
import { WindowSize } from '../../Context/Windowcontext'
import { USER } from '../../Api/Api'
import { Axios } from '../../Api/Axios'
import {Links} from './Links'

function SideBar() {
  const menu=useContext(Menu);
  const isopen=menu.isopen;

  const windowSizeee=useContext(WindowSize);
  // console.log(windowSizeee)

  const windowsizestate=windowSizeee.windowSize;

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
    <div style={{position:'fixed',
      top:'70px',left:'0',
      width:'100%',height:'100vh',
      backgroundColor:'rgba(0,0,0,0.5)',
      display:windowsizestate <'600' && isopen ? 'block' :'none',
    }}></div>
    <div className='side-bar pt-3' style={{
      width: isopen ? '220px' :'fit-content',
      left : windowsizestate < '600' ? (isopen ? 0 :'-100%') :'0',
      position: windowsizestate <'600' ? 'fixed' : 'sticky',

    }}>
      {Links.map((link,index)=>(
        link.role.includes(user.role) &&
        <NavLink key={index} to={link.path}  className='d-flex align-items-center gap-2 side-bar-link'>
        <FontAwesomeIcon style={{
          padding : isopen ? '10px 8px 10px 15px':'10px 13px'
        }} icon={link.icon} />
          <p className='m-0' style={{
            display: isopen ? 'block' : 'none'
          }}>{link.name}</p>
        </NavLink>
      ))}
    </div>
    </>
  )
}

export default SideBar