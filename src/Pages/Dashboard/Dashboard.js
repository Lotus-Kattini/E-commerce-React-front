import React from 'react'
import TopBar from '../../Components/Dashboard/TopBar'
import SideBar from '../../Components/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='position-relatvie '>
        <TopBar/>
        <div className='dashboard d-flex gap-1' style={{marginTop:'70px'}}>
        <SideBar/>
        <Outlet className='w-100'/>
        </div>
    </div>
  )
}

export default Dashboard