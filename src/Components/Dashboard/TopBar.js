import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Menu } from '../../Context/Menucontext'
import { Axios } from '../../Api/Axios';
import { LOGOUT, USER } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Cookie from 'cookie-universal'

function TopBar() {
  const menu=useContext(Menu);
  const setisopen=menu.setisopen;
  const [name,setname]=useState('')
  
  const cookie=Cookie();

  const nav=useNavigate()


  useEffect(()=>{
    Axios.get(`/${USER}`)
    .then((data)=>setname(data.data.name))
    .catch(()=>nav('/login',{replace:true}))
},[])

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
    <div className='top-bar d-flex align-items-center justify-content-between'>
      <div className='d-flex align-items-center gap-5'>
      <h3>E-commers</h3>
      <FontAwesomeIcon onClick={()=>{setisopen((prev)=>!prev)}} cursor={'pointer'} icon={faBars} />
      </div>
      <div>
      <DropdownButton id="dropdown-basic-button" title={name}>
        <Dropdown.Item onClick={handelLogOut}><FontAwesomeIcon icon={faRightFromBracket} />Log Out</Dropdown.Item>
      </DropdownButton>
      </div>
    </div>
  )
}

export default TopBar